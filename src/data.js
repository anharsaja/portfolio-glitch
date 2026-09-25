// ============================================================
//  SEMUA ISI PORTFOLIO ADA DI FILE INI.
//  Ganti teksnya saja, komponen lain tidak perlu disentuh.
// ============================================================

import {
  siLaravel,
  siPhp,
  siPython,
  siJavascript,
  siTypescript,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siMysql,
  siTailwindcss,
  siDocker,
  siGit,
  siVite,
} from 'simple-icons'

export const profile = {
  name: 'Anhar Mukhlis',
  // Foto diambil dari folder /public. Ganti file-nya kalau mau ganti foto.
  photo: '/image/wajah-cut.jpg',
  photoMask: '/image/wajah-mask.png',
  roles: ['Fullstack Developer', 'Backend Engineer', 'Bikin Web Sampai Tepar'],
  tagline:
    'Bikin web yang jalan, bukan cuma jalan-jalan. Fokus ke produk yang ringan, rapi, dan tidak bikin server nangis.',
  location: 'Indonesia',
  stats: [
    { value: '3+', label: 'Tahun ngoding' },
    { value: '20+', label: 'Project selesai' },
    { value: '∞', label: 'Cangkir kopi' },
  ],
}

// Logo tech stack yang lewat di ticker berjalan.
// Logo diambil dari paket simple-icons (https://simpleicons.org).
// Mau tambah? Cari namanya di situs itu, lalu import dengan awalan "si", contoh: siRedis.
export const ticker = [
  { label: 'Laravel', icon: siLaravel },
  { label: 'PHP', icon: siPhp },
  { label: 'Python', icon: siPython },
  { label: 'JavaScript', icon: siJavascript },
  { label: 'TypeScript', icon: siTypescript },
  { label: 'React', icon: siReact },
  { label: 'Next.js', icon: siNextdotjs },
  { label: 'Node.js', icon: siNodedotjs },
  { label: 'PostgreSQL', icon: siPostgresql },
  { label: 'MySQL', icon: siMysql },
  { label: 'Tailwind', icon: siTailwindcss },
  { label: 'Docker', icon: siDocker },
  { label: 'Git', icon: siGit },
  { label: 'Vite', icon: siVite },
]

// ============================ PROJECT ============================
// tags dipakai untuk tombol filter. Tambah/hapus sesukamu.
export const projects = [
  {
    title: 'Sistem Kasir Online',
    year: '2025',
    blurb:
      'Aplikasi POS berbasis web dengan cetak struk, laporan harian, dan mode offline saat internet ngambek.',
    tags: ['React', 'Node.js', 'MySQL'],
    category: 'Web App',
    live: 'https://contoh.com',
    repo: 'https://github.com/username/repo',
  },
  {
    title: 'Dashboard Analitik',
    year: '2025',
    blurb:
      'Visualisasi data penjualan real-time. Grafik interaktif, filter tanggal, dan ekspor ke Excel.',
    tags: ['Next.js', 'Chart.js', 'PostgreSQL'],
    category: 'Dashboard',
    live: 'https://contoh.com',
    repo: 'https://github.com/username/repo',
  },
  {
    title: 'Landing Page Produk',
    year: '2024',
    blurb:
      'Halaman promosi dengan animasi scroll yang halus. Skor Lighthouse 98, load di bawah satu detik.',
    tags: ['HTML', 'CSS', 'GSAP'],
    category: 'Website',
    live: 'https://contoh.com',
    repo: '',
  },
  {
    title: 'Bot Otomasi WhatsApp',
    year: '2024',
    blurb:
      'Bot balas pesan otomatis untuk toko online, lengkap dengan katalog produk dan pencatatan order.',
    tags: ['Node.js', 'Baileys', 'SQLite'],
    category: 'Automation',
    live: '',
    repo: 'https://github.com/username/repo',
  },
  {
    title: 'Aplikasi Inventori Gudang',
    year: '2023',
    blurb:
      'Pencatatan stok masuk-keluar dengan barcode scanner dan hak akses bertingkat untuk tiap staf.',
    tags: ['Laravel', 'Bootstrap', 'MySQL'],
    category: 'Web App',
    live: '',
    repo: 'https://github.com/username/repo',
  },
  {
    title: 'Portfolio Glitch',
    year: '2026',
    blurb:
      'Halaman yang sedang kamu buka sekarang. Dibangun dengan React, efek glitch murni CSS tanpa library berat.',
    tags: ['React', 'Vite', 'CSS'],
    category: 'Website',
    live: '',
    repo: 'https://github.com/username/repo',
  },
]

// ========================== EXPERIENCE ==========================
export const experience = [
  {
    period: 'Agustus (2026) — Oktober (2026)',
    role: 'Fullstack Developer | AI Automation',
    company: 'PT AGZO (Tulungagung)',
    points: [
      'Membangun dan merawat aplikasi internal yang dipakai puluhan karyawan tiap hari.',
      'Mengembangkan AI automation untuk mendukung proses internal perusahaan.',
    ],
  },
  {
    period: 'Agustus (2024) — Januari (2025)',
    role: 'Software Engineer',
    company: 'Brahma Tech',
    points: [
      'Menciptakan keajaiban dari keinganan banyak orang',
    ],
  },
  {
    period: 'Agustus (2023) — Januari (2024',
    role: 'Full-stack Developer',
    company: 'Gamelab Indonesia',
    points: [
      'Menangani project UMKM: company profile, katalog, dan toko online sederhana.',
    ],
  },
]

// ========================== VISI & MISI ==========================
export const vision = {
  main: 'TERUS BELAJAR MESKIPUN SAMPAI TEPAR',
  sub: '===/.\====}=.,===][]=13#===?=/==\=',
}

// =========================== KONTAK =============================
// Ganti "url" dengan akun aslimu. Hapus baris yang tidak dipakai.
export const socials = [
  { id: 'github', label: 'GitHub', handle: '@username', url: 'https://github.com/username' },
  { id: 'linkedin', label: 'LinkedIn', handle: '/in/username', url: 'https://linkedin.com/in/username' },
  { id: 'instagram', label: 'Instagram', handle: '@username', url: 'https://instagram.com/username' },
  { id: 'whatsapp', label: 'WhatsApp', handle: '+62 812-0000-0000', url: 'https://wa.me/6281200000000' },
  { id: 'mail', label: 'Email', handle: 'email@kamu.com', url: 'mailto:email@kamu.com' },
  { id: 'x', label: 'X / Twitter', handle: '@username', url: 'https://x.com/username' },
]
