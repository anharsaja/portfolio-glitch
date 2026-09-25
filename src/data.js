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
  roles: ['Full-stack Developer', 'Backend Engineer', 'Automation Engineer'],
  tagline:
    'I build web products that actually work: lightweight, clean, and easy on the servers.',
  location: 'Indonesia',
  stats: [
    { value: '3+', label: 'Years of coding' },
    { value: '20+', label: 'Projects shipped' },
    { value: '∞', label: 'Cups of coffee' },
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
    title: 'Online POS System',
    year: '2025',
    blurb:
      'Web-based point of sale with receipt printing, daily reports, and an offline mode for when the internet gives up.',
    tags: ['React', 'Node.js', 'MySQL'],
    category: 'Web App',
    live: 'https://contoh.com',
    repo: 'https://github.com/username/repo',
  },
  {
    title: 'Analytics Dashboard',
    year: '2025',
    blurb:
      'Real-time sales data visualization with interactive charts, date filters, and Excel export.',
    tags: ['Next.js', 'Chart.js', 'PostgreSQL'],
    category: 'Dashboard',
    live: 'https://contoh.com',
    repo: 'https://github.com/username/repo',
  },
  {
    title: 'Product Landing Page',
    year: '2024',
    blurb:
      'Promotional page with smooth scroll animations. Lighthouse score of 98, loads in under a second.',
    tags: ['HTML', 'CSS', 'GSAP'],
    category: 'Website',
    live: 'https://contoh.com',
    repo: '',
  },
  {
    title: 'WhatsApp Automation Bot',
    year: '2024',
    blurb:
      'Auto-reply bot for online stores, complete with a product catalog and order tracking.',
    tags: ['Node.js', 'Baileys', 'SQLite'],
    category: 'Automation',
    live: '',
    repo: 'https://github.com/username/repo',
  },
  {
    title: 'Warehouse Inventory App',
    year: '2023',
    blurb:
      'Stock-in and stock-out tracking with a barcode scanner and role-based access for every staff member.',
    tags: ['Laravel', 'Bootstrap', 'MySQL'],
    category: 'Web App',
    live: '',
    repo: 'https://github.com/username/repo',
  },
  {
    title: 'Portfolio Glitch',
    year: '2026',
    blurb:
      "The page you're looking at right now. Built with React, with glitch effects in pure CSS and no heavy libraries.",
    tags: ['React', 'Vite', 'CSS'],
    category: 'Website',
    live: '',
    repo: 'https://github.com/username/repo',
  },
]

// ========================== EXPERIENCE ==========================
// type   = status kerja (Contract, Intern, Full-time, Freelance, ...).
// desc   = deskripsi singkat posisi, points = poin pencapaian (boleh kosong).
// Pernah ganti posisi di perusahaan yang sama? Pakai "roles" (terbaru di atas),
// nanti tampil bertumpuk di bawah satu nama perusahaan seperti di LinkedIn.
export const experience = [
  {
    period: 'Aug 2026 — Oct 2026',
    company: 'PT AGZO (Tulungagung)',
    type: 'Contract',
    roles: [
      {
        period: 'Sep 2026 — Oct 2026',
        role: 'Automate, Deploy, Scale, and Repeat',
        desc:
          'Owned the full delivery cycle of internal systems: automating workflows, shipping them to production, and scaling what works across teams.',
        points: [],
      },
      {
        period: 'Aug 2026 — Sep 2026',
        role: 'Full-stack Developer & Automation Engineer',
        desc:
          'Built full-stack internal applications and designed AI-powered automations to streamline day-to-day company operations.',
        points: [
          'Built and maintained internal applications used daily by dozens of employees.',
          "Developed AI automations to support the company's internal processes.",
        ],
      },
    ],
  },
  {
    period: 'Aug 2024 — Jan 2025',
    company: 'Brahma Tech',
    type: 'Contract',
    // TODO: isi periode tiap posisi (mis. 'Aug 2024 — Sep 2024'). Kosong = tidak ditampilkan.
    roles: [
      {
        period: '',
        role: 'Backend Developer',
        desc:
          'Designed and built server-side services and APIs, with a focus on reliable data handling and clean integrations.',
        points: [],
      },
      {
        period: '',
        role: 'IoT Developer',
        desc:
          'Connected hardware devices to the web: collecting sensor data and wiring it into backend services and dashboards.',
        points: [],
      },
      {
        period: '',
        role: 'Full-stack Developer',
        desc:
          'Delivered features end to end, from database and API to the user interface, tailored to client needs.',
        points: ["Turned a lot of people's wishes into working software."],
      },
    ],
  },
  {
    period: 'Aug 2023 — Jan 2024',
    role: 'Full-stack Developer',
    company: 'Gamelab Indonesia',
    type: 'Intern',
    desc:
      'Delivered end-to-end web projects for small and medium businesses, covering both frontend and backend.',
    points: ['Handled SME projects: company profiles, catalogs, and simple online stores.'],
  },
]

// ========================== VISI & MISI ==========================
export const vision = {
  main: 'KEEP LEARNING, EVEN IF IT KNOCKS YOU OUT',
  sub: '===/.\====}=.,===][]=13#===?=/==\=',
}

// =========================== KONTAK =============================
// Ganti "url" dengan akun aslimu. Hapus baris yang tidak dipakai.
export const socials = [
  { id: 'github', label: 'GitHub', handle: '@anharsaja', url: 'https://github.com/anharsaja' },
  { id: 'linkedin', label: 'LinkedIn', handle: '/in/mukhlis-anhar', url: 'https://linkedin.com/in/mukhlis-anhar' },
  { id: 'instagram', label: 'Instagram', handle: '@anhar.co.id', url: 'https://instagram.com/anhar.co.id' },
  // { id: 'whatsapp', label: 'WhatsApp', handle: '+62 812-0000-0000', url: 'https://wa.me/6281200000000' },
  { id: 'mail', label: 'Email', handle: 'anharmukhlis1@gmail.com', url: 'mailto:anharmukhlis1@gmail.com' },
  { id: 'threads', label: 'Threads', handle: '@anhar.co.id', url: 'https://www.threads.com/@anhar.co.id' },
]
