/**
 * Menghapus latar belakang foto, lalu menyimpannya sebagai JPEG (warna) dan
 * PNG kecil berisi bentuk siluet di kanal alpha (dipakai CSS sebagai mask).
 *
 *   node scripts/cutout.mjs public/image/wajah.jpeg public/image/wajah
 *
 * Cara kerjanya: latar tembok dikenali dari warnanya yang pucat dan nyaris
 * tidak berwarna (saturasi rendah), sementara kulit dan rambut jauh lebih
 * berwarna atau jauh lebih gelap. Area latar lalu dirambatkan dari tepi
 * gambar ke dalam, supaya bagian terang di tengah subjek (misalnya sablon
 * kaos) tidak ikut terhapus.
 *
 * Kalau nanti ganti foto dan hasilnya kurang pas, setel angka di bawah ini.
 */

import fs from 'node:fs'
import jpeg from 'jpeg-js'
import { PNG } from 'pngjs'

const [, , INPUT = 'public/image/wajah.jpeg', OUT_BASE = 'public/image/wajah'] =
  process.argv

// --- pengaturan ---
const BG_SAT_MAX = 0.2 // latar dianggap "tidak berwarna" di bawah nilai ini
const BG_LUM_MIN = 76 // latar harus lebih terang dari ini (biar rambut aman)
const RELAX_SAT_MAX = 0.32 // ambang longgar untuk melebarkan area latar
const RELAX_LUM_MIN = 70
const RELAX_RADIUS = 60 // sejauh mana (px) pelebaran itu boleh merambat
const TOP_FORCE = 0.12 // porsi baris paling atas yang selalu dianggap latar
const SEED_SKIP_BOTTOM = 0.24 // tepi bawah tidak dipakai sebagai titik awal (badan)
const ERODE = 1 // kikis tepi (px) untuk membuang sisa warna tembok
const FEATHER = 1.6 // kehalusan tepi (px)
const PAD = 0.03 // ruang kosong di sekeliling subjek saat dipotong
const BLEED = 6 // seberapa jauh warna subjek dirembeskan ke area latar (px)
const QUALITY = 84 // mutu JPEG hasil potong

// --- efek badan larut jadi glitch ---
// Diukur dari tinggi hasil potong: 0 = ubun-ubun, 1 = paling bawah.
// Untuk foto ini leher ada di 0.50 dan bahu melebar mulai 0.58, jadi larutnya
// dimulai tepat di bawah tulang selangka. Jalankan scripts/cutout.mjs lalu
// lihat hasilnya kalau ganti foto — angka ini yang paling sering perlu disetel.
const DISSOLVE_START = 0.62 // mulai pecah
const DISSOLVE_END = 0.94 // badan sudah habis
const BLOCK_W = 12 // lebar blok pecahan (px)
const BLOCK_H = 6 // tinggi blok pecahan (px)
const BAND_H = 9 // tinggi pita yang digeser ke samping (px)
const SHIFT_MAX = 26 // pergeseran terjauh pita (px)
const LINE_DROP = 0.4 // seberapa banyak potongan baris scan yang ikut padam
const LINE_SEG = 96 // lebar potongan baris scan (px)

const raw = jpeg.decode(fs.readFileSync(INPUT), { useTArray: true })
const { width: W, height: H, data: src } = raw
const N = W * H

// ---------- 1. tandai piksel yang "berwarna seperti latar" ----------
const looksBg = new Uint8Array(N)
const forcedRows = Math.floor(H * TOP_FORCE)

for (let p = 0; p < N; p++) {
  if ((p / W | 0) < forcedRows) {
    looksBg[p] = 1
    continue
  }
  const i = p * 4
  const r = src[i]
  const g = src[i + 1]
  const b = src[i + 2]
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const sat = max ? (max - min) / max : 0
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  if (sat < BG_SAT_MAX && lum > BG_LUM_MIN) looksBg[p] = 1
}

// ---------- 2. rambatkan dari tepi gambar ----------
const isBg = new Uint8Array(N)
const queue = new Int32Array(N)
let head = 0
let tail = 0

const push = (p) => {
  if (isBg[p] || !looksBg[p]) return
  isBg[p] = 1
  queue[tail++] = p
}

const seedLimit = Math.floor(H * (1 - SEED_SKIP_BOTTOM))
for (let x = 0; x < W; x++) push(x)
for (let y = 0; y < seedLimit; y++) {
  push(y * W)
  push(y * W + W - 1)
}

while (head < tail) {
  const p = queue[head++]
  const x = p % W
  const y = (p / W) | 0
  if (x > 0) push(p - 1)
  if (x < W - 1) push(p + 1)
  if (y > 0) push(p - W)
  if (y < H - 1) push(p + W)
}

// ---------- 2b. perluasan dengan ambang longgar ----------
// Tembok di dekat leher memantulkan warna kulit, jadi saturasinya naik dan
// tidak tertangkap ambang ketat di atas. Di sini area latar yang sudah pasti
// dilebarkan memakai ambang longgar, tapi dibatasi jaraknya supaya tidak
// merambat jauh ke dalam wajah.
const dist = new Int32Array(N).fill(-1)
head = 0
tail = 0
for (let p = 0; p < N; p++) {
  if (isBg[p]) {
    dist[p] = 0
    queue[tail++] = p
  }
}

const relaxedBg = (p) => {
  const i = p * 4
  const r = src[i]
  const g = src[i + 1]
  const b = src[i + 2]
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const sat = max ? (max - min) / max : 0
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  return sat < RELAX_SAT_MAX && lum > RELAX_LUM_MIN
}

while (head < tail) {
  const p = queue[head++]
  if (dist[p] >= RELAX_RADIUS) continue
  const x = p % W
  const y = (p / W) | 0
  const grow = (q) => {
    if (isBg[q] || dist[q] !== -1 || !relaxedBg(q)) return
    isBg[q] = 1
    dist[q] = dist[p] + 1
    queue[tail++] = q
  }
  if (x > 0) grow(p - 1)
  if (x < W - 1) grow(p + 1)
  if (y > 0) grow(p - W)
  if (y < H - 1) grow(p + W)
}

// ---------- 3. alpha awal + kikis tepi ----------
let alpha = new Float32Array(N)
for (let p = 0; p < N; p++) alpha[p] = isBg[p] ? 0 : 255

for (let k = 0; k < ERODE; k++) {
  const next = Float32Array.from(alpha)
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x
      if (!alpha[p]) continue
      if (!alpha[p - 1] || !alpha[p + 1] || !alpha[p - W] || !alpha[p + W]) next[p] = 0
    }
  }
  alpha = next
}

// ---------- 4. haluskan tepi ----------
const radius = Math.max(1, Math.round(FEATHER))
const blur = (input, horizontal) => {
  const out = new Float32Array(N)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let sum = 0
      let count = 0
      for (let d = -radius; d <= radius; d++) {
        const nx = horizontal ? x + d : x
        const ny = horizontal ? y : y + d
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
        sum += input[ny * W + nx]
        count++
      }
      out[y * W + x] = sum / count
    }
  }
  return out
}
alpha = blur(blur(alpha, true), false)

// ---------- 5. potong sesuai batas subjek ----------
let minX = W
let minY = H
let maxX = 0
let maxY = 0
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (alpha[y * W + x] < 24) continue
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }
}
if (minX > maxX || minY > maxY) throw new Error('Subjek tidak terdeteksi — coba turunkan BG_SAT_MAX.')

const padX = Math.round((maxX - minX) * PAD)
const padY = Math.round((maxY - minY) * PAD)
minX = Math.max(0, minX - padX)
maxX = Math.min(W - 1, maxX + padX)
minY = Math.max(0, minY - padY)
maxY = Math.min(H - 1, maxY + padY)

const cw = maxX - minX + 1
const ch = maxY - minY + 1

// ---------- 6. rembeskan warna subjek ke area latar ----------
// JPEG selalu sedikit melebarkan warna di perbatasan. Kalau latarnya masih
// berwarna tembok, sisa warna itu akan terlihat sebagai garis pucat di tepi
// siluet. Jadi area latar diisi dulu dengan warna tetangganya.
const rgb = new Uint8ClampedArray(N * 3)
for (let p = 0; p < N; p++) {
  rgb[p * 3] = src[p * 4]
  rgb[p * 3 + 1] = src[p * 4 + 1]
  rgb[p * 3 + 2] = src[p * 4 + 2]
}

let known = new Uint8Array(N)
for (let p = 0; p < N; p++) known[p] = alpha[p] > 8 ? 1 : 0

for (let pass = 0; pass < BLEED; pass++) {
  const next = Uint8Array.from(known)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x
      if (known[p]) continue
      let r = 0
      let g = 0
      let b = 0
      let n = 0
      const take = (q) => {
        if (!known[q]) return
        r += rgb[q * 3]
        g += rgb[q * 3 + 1]
        b += rgb[q * 3 + 2]
        n++
      }
      if (x > 0) take(p - 1)
      if (x < W - 1) take(p + 1)
      if (y > 0) take(p - W)
      if (y < H - 1) take(p + W)
      if (!n) continue
      rgb[p * 3] = r / n
      rgb[p * 3 + 1] = g / n
      rgb[p * 3 + 2] = b / n
      next[p] = 1
    }
  }
  known = next
}

// ---------- 7. tulis JPEG (warna) + PNG (mask alpha) ----------
// Dipisah supaya jauh lebih ringan daripada satu PNG transparan: foto
// dikompresi sebagai JPEG, dan bentuk siluetnya disimpan di kanal alpha
// sebuah PNG kecil yang dipakai CSS sebagai mask.
const colorRgba = Buffer.alloc(cw * ch * 4)
const maskPng = new PNG({ width: cw, height: ch })

// Angka acak yang tetap sama tiap kali skrip dijalankan, supaya hasilnya
// bisa diulang dan tidak berubah-ubah sendiri.
const hash = (a, b) => {
  let h = Math.imul(a, 374761393) + Math.imul(b, 668265263)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v)

for (let y = 0; y < ch; y++) {
  // t = 0 di batas atas area larut, 1 saat badan sudah habis
  const t = clamp((y / ch - DISSOLVE_START) / (DISSOLVE_END - DISSOLVE_START), 0, 1)

  // dihaluskan di kedua ujung supaya batas atas area larut tidak terlihat
  // sebagai garis mendatar yang tegas
  const te = t * t * (3 - 2 * t)

  // tiap pita baris digeser ke samping seperti siaran yang kehilangan sinyal
  const band = (y / BAND_H) | 0
  const shift = te > 0 ? Math.round((hash(band, 7) * 2 - 1) * SHIFT_MAX * te) : 0

  for (let x = 0; x < cw; x++) {
    const dp = (y * cw + x) * 4
    const sx = clamp(minX + x - shift, 0, W - 1)
    const sp = (minY + y) * W + sx

    colorRgba[dp] = rgb[sp * 3]
    colorRgba[dp + 1] = rgb[sp * 3 + 1]
    colorRgba[dp + 2] = rgb[sp * 3 + 2]
    colorRgba[dp + 3] = 255

    let a = alpha[sp]

    if (te > 0) {
      // badan pecah jadi blok-blok; makin ke bawah makin sedikit yang bertahan
      const keep = 1 - te
      const alive = hash((x / BLOCK_W) | 0, (y / BLOCK_H) | 0) < keep
      // potongan baris scan ikut padam — dipotong per segmen, bukan selebar
      // badan, supaya tidak jadi garis lurus yang memotong gambar
      const lineT = clamp((te - 0.25) / 0.75, 0, 1)
      const lineOut = hash(y * 131 + ((x / LINE_SEG) | 0), 31) < lineT * LINE_DROP
      a = alive && !lineOut ? a * (0.55 + 0.45 * keep) : 0
    }

    // RGB sengaja hitam: yang dipakai browser hanya kanal alpha-nya
    maskPng.data[dp + 3] = Math.round(clamp(a, 0, 255))
  }
}

const jpegOut = jpeg.encode({ data: colorRgba, width: cw, height: ch }, QUALITY)
fs.writeFileSync(`${OUT_BASE}-cut.jpg`, jpegOut.data)
fs.writeFileSync(`${OUT_BASE}-mask.png`, PNG.sync.write(maskPng, { deflateLevel: 9 }))

const kb = (file) => (fs.statSync(file).size / 1024).toFixed(0) + ' KB'
let kept = 0
for (let p = 0; p < N; p++) if (alpha[p] > 128) kept++

console.log(`sumber : ${INPUT} (${W}x${H})`)
console.log(`warna  : ${OUT_BASE}-cut.jpg  (${cw}x${ch}, ${kb(`${OUT_BASE}-cut.jpg`)})`)
console.log(`mask   : ${OUT_BASE}-mask.png (${cw}x${ch}, ${kb(`${OUT_BASE}-mask.png`)})`)
console.log(`rasio  : ${cw} / ${ch}  ->  pakai angka ini di aspect-ratio CSS`)
console.log(`subjek : ${((kept / N) * 100).toFixed(1)}% dari gambar asli`)
