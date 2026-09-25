import type { MenuId, PesLocale } from './types';

export interface MenuText {
  label: string;
  title: string;
  description: string;
}

export interface PesDict {
  menu: Record<MenuId, MenuText>;
  hints: {
    select: string;
    confirm: string;
    back: string;
    player: string;
    filter: string;
    open: string;
    ministry: string;
    sprint: string;
    option: string;
    change: string;
  };
  title: { start: string; edition: string; classic: string };
  pill: (n: number) => string;
  openBtn: (label: string) => string;
  backBtn: string;
  rotate: string;
  dismiss: string;
  projects: {
    all: string;
    demo: string;
    github: string;
    list: string;
    empty: string;
    statuses: Record<string, string>;
  };
  sprints: {
    lockedTitle: string;
    lockedText: string;
    signIn: string;
    empty: string;
    tasks: string;
    progress: string;
    status: string;
    start: string;
    end: string;
    taskCount: string;
    noItems: string;
    carriedOver: string;
    other: string;
    items: string;
    taskStatus: Record<string, string>;
    iteration: string;
    buffer: string;
    yearIntro: (year: number) => string;
  };
  about: {
    role: string;
    availability: string;
    p1: (location: string) => string;
    p2: string;
    stats: { projects: string; live: string; building: string; featured: string };
  };
  contact: {
    intro: string;
    email: string;
    github: string;
    linkedin: string;
    resume: string;
    viewPdf: string;
    ideas: string;
    ideasText: string;
  };
  options: {
    language: string;
    languageHint: string;
    motion: string;
    motionHint: string;
    sound: string;
    soundHint: string;
    classic: string;
    classicHint: string;
    on: string;
    off: string;
    open: string;
  };
}

const en: PesDict = {
  menu: {
    projects: { label: 'Projects', title: 'PROJECTS', description: 'Browse every project as a player card, filtered by status.' },
    featured: { label: 'Featured', title: 'FEATURED', description: 'The star players: my strongest, most complete work.' },
    vision: { label: 'Vision', title: 'VISION', description: 'Ministries and initiatives: where this portfolio is heading.' },
    sprints: { label: 'Sprints', title: 'SPRINTS', description: 'What is being built right now, and how far along it is.' },
    about: { label: 'About', title: 'ABOUT', description: 'Background, skills and the story so far.' },
    contact: { label: 'Contact', title: 'CONTACT', description: 'Get in touch for a full-stack or backend role.' },
    archive: { label: 'Archive', title: 'ARCHIVE', description: 'Retired and archived projects from the gallery.' },
    settings: { label: 'Options', title: 'OPTIONS', description: 'Language, motion and sound preferences.' },
  },
  hints: {
    select: 'Select',
    confirm: 'Confirm',
    back: 'Back',
    player: 'Player',
    filter: 'Filter',
    open: 'Open',
    ministry: 'Ministry',
    sprint: 'Sprint',
    option: 'Option',
    change: 'Change',
  },
  title: { start: 'PRESS START', edition: 'PORTFOLIO EDITION', classic: 'Classic site' },
  pill: (n) => `${n} PROJECTS`,
  openBtn: (label) => `OPEN ${label}`,
  backBtn: 'BACK',
  rotate: 'Rotate your phone for the full view',
  dismiss: 'Dismiss',
  projects: {
    all: 'All',
    demo: 'LIVE DEMO',
    github: 'GITHUB',
    list: 'LIST',
    empty: 'Nothing here yet.',
    statuses: {
      active: 'Active',
      'in-progress': 'In Progress',
      'in-portfolio': 'In Portfolio',
      concept: 'Concept',
      archived: 'Archived',
    },
  },
  sprints: {
    lockedTitle: 'Owner only',
    lockedText: 'Sprint planning is private. Sign in as the site owner to see what is being built right now.',
    signIn: 'SIGN IN',
    empty: 'No sprints yet.',
    tasks: 'tasks',
    progress: 'PROGRESS',
    status: 'STATUS',
    start: 'START',
    end: 'END',
    taskCount: 'TASKS',
    noItems: 'No items in this sprint yet.',
    carriedOver: 'CARRIED OVER',
    other: 'OTHER SPRINTS',
    items: 'ITEMS',
    taskStatus: { todo: 'TODO', 'in-progress': 'DOING', blocked: 'BLOCKED', done: 'DONE' },
    iteration: 'Iteration',
    buffer: 'Buffer',
    yearIntro: (y) => `${y}: 4 iterations, each with 4 three-week sprints and a buffer week. Starts every 1 January.`,
  },
  about: {
    role: 'Full-stack Developer',
    availability: 'Open to full-stack / backend roles',
    p1: (loc) =>
      `A full-stack developer based in ${loc}. I build products end to end — Next.js/TypeScript front-ends, ASP.NET Core and Supabase back-ends, and native Android in Kotlin.`,
    p2: 'Most of my projects tackle specifically Malaysian problems: personal finance and LHDN tax relief, government queueing, and student surveys.',
    stats: { projects: 'PROJECTS', live: 'LIVE', building: 'BUILDING', featured: 'FEATURED' },
  },
  contact: {
    intro: 'Hiring for a full-stack or backend role, or want to talk through one of these projects? Drop me a line.',
    email: 'EMAIL',
    github: 'GITHUB',
    linkedin: 'LINKEDIN',
    resume: 'RESUME',
    viewPdf: 'View PDF',
    ideas: 'IDEAS',
    ideasText: 'Suggest a software idea for a ministry',
  },
  options: {
    language: 'LANGUAGE',
    languageHint: 'Language for the menu, About, Contact and Vision.',
    motion: 'REDUCE MOTION',
    motionHint: 'Turns off animations and transitions in this menu.',
    sound: 'SOUND',
    soundHint: 'Short menu blips when moving and confirming.',
    classic: 'CLASSIC SITE',
    classicHint: 'The original scrolling portfolio layout.',
    on: 'ON',
    off: 'OFF',
    open: 'OPEN',
  },
};

const ms: PesDict = {
  menu: {
    projects: { label: 'Projek', title: 'PROJEK', description: 'Lihat semua projek sebagai kad pemain, ditapis mengikut status.' },
    featured: { label: 'Terbaik', title: 'TERBAIK', description: 'Pemain bintang: hasil kerja saya yang terkuat dan paling lengkap.' },
    vision: { label: 'Visi', title: 'VISI', description: 'Kementerian dan inisiatif: hala tuju portfolio ini.' },
    sprints: { label: 'Sprint', title: 'SPRINT', description: 'Apa yang sedang dibina sekarang, dan setakat mana kemajuannya.' },
    about: { label: 'Tentang', title: 'TENTANG', description: 'Latar belakang, kemahiran dan kisah setakat ini.' },
    contact: { label: 'Hubungi', title: 'HUBUNGI', description: 'Hubungi saya untuk peranan full-stack atau backend.' },
    archive: { label: 'Arkib', title: 'ARKIB', description: 'Projek yang telah diarkibkan daripada galeri.' },
    settings: { label: 'Tetapan', title: 'TETAPAN', description: 'Pilihan bahasa, gerakan dan bunyi.' },
  },
  hints: {
    select: 'Pilih',
    confirm: 'Sahkan',
    back: 'Kembali',
    player: 'Projek',
    filter: 'Tapis',
    open: 'Buka',
    ministry: 'Kementerian',
    sprint: 'Sprint',
    option: 'Pilihan',
    change: 'Tukar',
  },
  title: { start: 'TEKAN MULA', edition: 'EDISI PORTFOLIO', classic: 'Laman klasik' },
  pill: (n) => `${n} PROJEK`,
  openBtn: (label) => `BUKA ${label}`,
  backBtn: 'KEMBALI',
  rotate: 'Putar telefon anda untuk paparan penuh',
  dismiss: 'Tutup',
  projects: {
    all: 'Semua',
    demo: 'DEMO LANGSUNG',
    github: 'GITHUB',
    list: 'SENARAI',
    empty: 'Belum ada apa-apa di sini.',
    statuses: {
      active: 'Aktif',
      'in-progress': 'Sedang Dibina',
      'in-portfolio': 'Dalam Portfolio',
      concept: 'Konsep',
      archived: 'Diarkibkan',
    },
  },
  sprints: {
    lockedTitle: 'Pemilik sahaja',
    lockedText: 'Perancangan sprint adalah peribadi. Log masuk sebagai pemilik laman untuk melihat apa yang sedang dibina.',
    signIn: 'LOG MASUK',
    empty: 'Belum ada sprint.',
    tasks: 'tugasan',
    progress: 'KEMAJUAN',
    status: 'STATUS',
    start: 'MULA',
    end: 'TAMAT',
    taskCount: 'TUGASAN',
    noItems: 'Belum ada item dalam sprint ini.',
    carriedOver: 'DIBAWA KE HADAPAN',
    other: 'SPRINT LAIN',
    items: 'ITEM',
    taskStatus: { todo: 'TERBUKA', 'in-progress': 'DIBUAT', blocked: 'TERHALANG', done: 'SIAP' },
    iteration: 'Iterasi',
    buffer: 'Penampan',
    yearIntro: (y) => `${y}: 4 iterasi, setiap satu 4 sprint tiga minggu dan seminggu penampan. Bermula setiap 1 Januari.`,
  },
  about: {
    role: 'Pembangun Full-stack',
    availability: 'Terbuka untuk peranan full-stack / backend',
    p1: (loc) =>
      `Pembangun full-stack yang berpangkalan di ${loc}. Saya membina produk dari hujung ke hujung — bahagian hadapan Next.js/TypeScript, bahagian belakang ASP.NET Core dan Supabase, serta Android asli dalam Kotlin.`,
    p2: 'Kebanyakan projek saya menangani masalah khusus Malaysia: kewangan peribadi dan pelepasan cukai LHDN, giliran perkhidmatan kerajaan, dan tinjauan pelajar.',
    stats: { projects: 'PROJEK', live: 'LANGSUNG', building: 'DIBINA', featured: 'TERBAIK' },
  },
  contact: {
    intro: 'Mencari pembangun full-stack atau backend, atau mahu berbincang tentang salah satu projek ini? Hubungi saya.',
    email: 'E-MEL',
    github: 'GITHUB',
    linkedin: 'LINKEDIN',
    resume: 'RESUME',
    viewPdf: 'Lihat PDF',
    ideas: 'IDEA',
    ideasText: 'Cadangkan idea perisian untuk sebuah kementerian',
  },
  options: {
    language: 'BAHASA',
    languageHint: 'Bahasa untuk menu, Tentang, Hubungi dan Visi.',
    motion: 'KURANGKAN GERAKAN',
    motionHint: 'Matikan animasi dan peralihan dalam menu ini.',
    sound: 'BUNYI',
    soundHint: 'Bunyi menu yang pendek semasa bergerak dan mengesahkan.',
    classic: 'LAMAN KLASIK',
    classicHint: 'Reka letak portfolio asal yang boleh digulung.',
    on: 'HIDUP',
    off: 'MATI',
    open: 'BUKA',
  },
};

export const PES_DICT: Record<PesLocale, PesDict> = { en, ms };
