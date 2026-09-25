# Portfolio Glitch

Portfolio developer satu halaman dengan tema glitch / CRT. Dibangun dengan **React + Vite**,
efek glitch murni CSS (tanpa library animasi), siap deploy ke **Vercel**.

## Jalankan di lokal

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # hasil build ke folder dist/
npm run preview   # cek hasil build
```

## Yang perlu kamu ganti

Hampir semua isi ada di satu file: **`src/data.js`**.

| Bagian | Isi |
| --- | --- |
| `profile` | Nama, foto, daftar role, tagline, angka statistik |
| `ticker` | Teks berjalan di bawah hero |
| `projects` | Showcase project (judul, tahun, deskripsi, tag, link live/repo) |
| `experience` | Riwayat kerja |
| `vision` | Visi, sub-visi, dan tiga poin misi |
| `socials` | Isi modal tombol **CONTACT ME** |

Filter project dibuat otomatis dari field `category`, jadi cukup tulis kategorinya
di tiap project — tombol filternya muncul sendiri.

## Foto wajah

Latar foto sudah dihapus, dan hasilnya disimpan sebagai dua file:

| File | Isi |
| --- | --- |
| `public/image/wajah.jpeg` | foto asli, dipakai sebagai sumber |
| `public/image/wajah-cut.jpg` | warna foto setelah dipotong (83 KB) |
| `public/image/wajah-mask.png` | bentuk siluet, disimpan di kanal alpha (21 KB) |

Dipisah begini supaya ringan: satu PNG transparan memakan 590 KB, dua file ini
hanya 104 KB. CSS memakai file mask untuk memotong semua lapisan efek, jadi
scanline dan cahaya hanya jatuh di badan — bukan di kotak persegi.

### Badan yang larut

Mulai sedikit di bawah tulang selangka, badan sengaja dibuat pecah jadi blok,
bergeser seperti siaran yang kehilangan sinyal, lalu habis sebelum ujung bawah.
Efek ini dibakar ke dalam file mask, bukan ditumpuk lewat CSS, supaya semua
lapisan (siluet warna, scanline, cahaya sapuan) ikut larut serempak. Warna
menyalanya datang dari `.photo__frag` di `src/styles/glitch.css`.

Penyetelnya ada di `scripts/cutout.mjs`, bagian `--- efek badan larut ---`.
Semua diukur sebagai pecahan tinggi foto, 0 di ubun-ubun dan 1 di paling bawah:

- `DISSOLVE_START` (0.62) — batas mulai pecah. Turunkan kalau mau badan lebih
  cepat hilang, naikkan kalau mau bahu terlihat lebih utuh.
- `DISSOLVE_END` (0.94) — titik badan habis sama sekali.
- `BLOCK_W` / `BLOCK_H` — ukuran blok pecahan. Besarkan untuk kesan lebih kasar.
- `SHIFT_MAX` — sejauh mana pita baris meloncat ke samping.
- `LINE_DROP` / `LINE_SEG` — banyak dan lebar potongan baris scan yang padam.

Kalau ganti foto, cek dulu di mana leher dan bahunya jatuh, lalu sesuaikan
`DISSOLVE_START`. Warna gradasi `.photo__frag` juga perlu digeser mengikutinya
supaya tidak mengenai wajah.

### Ganti foto

```bash
# taruh foto baru di public/image/, lalu:
npm run cutout -- public/image/fotobaru.jpg public/image/wajah
```

Perintah itu menimpa `wajah-cut.jpg` dan `wajah-mask.png`. Kalau hasil
potongannya kurang rapi, setel angka di bagian `--- pengaturan ---` pada
`scripts/cutout.mjs`:

- `BG_SAT_MAX` — makin besar, makin banyak yang dianggap latar. Naikkan kalau
  masih ada sisa tembok; turunkan kalau kulit ikut terhapus.
- `BG_LUM_MIN` — batas gelap. Turunkan kalau bayangan di latar belum hilang.
- `TOP_FORCE` — porsi baris teratas yang selalu dibuang (untuk plafon, kusen, dsb).
- `FEATHER` / `ERODE` — kehalusan dan kikisan tepi.

Skrip ini cocok untuk latar polos seperti tembok. Untuk latar ramai, potong
manual dulu di aplikasi editor foto, simpan sebagai PNG transparan, lalu pakai
file itu untuk `photo` sekaligus `photoMask` di `src/data.js`.

Kalau ukuran foto barunya beda, sesuaikan `aspect-ratio` pada `.photo`
di `src/styles/glitch.css` — skripnya mencetak angka rasio yang benar.

Foto sumber yang paling cocok: potret tegak, wajah agak ke atas, latar polos,
minimal 800 px lebar. Kalau file fotonya tidak terbaca, yang muncul kotak
placeholder — bukan gambar rusak.

## Deploy ke Vercel

**Lewat dashboard:** push repo ini ke GitHub, lalu di Vercel pilih *Add New → Project*
dan import repo-nya. Vercel mendeteksi Vite otomatis:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

**Lewat CLI:**

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # produksi
```

## Catatan teknis

- `src/styles/glitch.css` — semua efek: teks glitch, foto glitch, scanline, noise, animasi modal.
- `src/styles/global.css` — token warna, tata letak, komponen, responsif.
- Efek glitch memakai atribut `data-text`. Kalau menambah judul baru, tulis
  `className="glitch"` **dan** `data-text` berisi teks yang sama persis.
- Semua animasi otomatis mati kalau pengunjung mengaktifkan
  *reduce motion* di setelan sistemnya.
- Modal kontak bisa ditutup dengan tombol `Esc` atau klik area gelap, dan fokus
  keyboard dikunci di dalam modal selama terbuka.
