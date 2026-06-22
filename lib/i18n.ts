export type Locale = 'en' | 'ms';

export const locales: Locale[] = ['en', 'ms'];

/** Static UI strings for the vision pages, per locale. */
export const dict = {
  en: {
    portfolio: "Taufik's Portfolio",
    visionTitle: 'Improving Malaysia through software',
    visionIntro:
      "Every government ministry faces problems software can help solve. This is a living plan — each ministry maps to real problems and the software that could address them. Have an idea? Pick a ministry and submit it.",
    ministries: 'Ministries',
    allMinistries: 'All ministries',
    initiativesSuffix: (n: number) => `${n} initiative${n > 1 ? 's' : ''} →`,
    beFirst: 'Be the first to suggest →',
    problemsAndIdeas: 'Problems & software ideas',
    noInitiatives: 'No initiatives mapped yet. Be the first to suggest one below.',
    problem: 'Problem',
    idea: 'Idea',
    poweredBy: 'Powered by',
    fromCommunity: 'From the community',
    haveIdea: 'Have an idea for this ministry?',
    submitIntro:
      'Submit a problem and how software could solve it. Submissions are reviewed before they appear publicly.',
    submitted: 'Thanks! Your idea was submitted and will appear here once reviewed.',
    theProblem: 'The problem *',
    yourIdea: 'Your idea *',
    problemPlaceholder: 'What problem in this ministry could software help with?',
    ideaPlaceholder: 'How could software solve it?',
    yourName: 'Your name (optional)',
    contact: 'Contact (optional)',
    contactPlaceholder: 'Email or @handle',
    submitButton: 'Submit idea',
    langLabel: 'BM',
  },
  ms: {
    portfolio: 'Portfolio Taufik',
    visionTitle: 'Memajukan Malaysia menerusi perisian',
    visionIntro:
      'Setiap kementerian kerajaan menghadapi masalah yang boleh dibantu oleh perisian. Ini ialah rancangan hidup — setiap kementerian dipadankan dengan masalah sebenar dan perisian yang boleh menanganinya. Ada idea? Pilih kementerian dan hantarkannya.',
    ministries: 'Kementerian',
    allMinistries: 'Semua kementerian',
    initiativesSuffix: (n: number) => `${n} inisiatif →`,
    beFirst: 'Jadilah yang pertama mencadangkan →',
    problemsAndIdeas: 'Masalah & idea perisian',
    noInitiatives: 'Belum ada inisiatif dipetakan. Jadilah yang pertama mencadangkan di bawah.',
    problem: 'Masalah',
    idea: 'Idea',
    poweredBy: 'Dikuasakan oleh',
    fromCommunity: 'Daripada komuniti',
    haveIdea: 'Ada idea untuk kementerian ini?',
    submitIntro:
      'Hantar satu masalah dan bagaimana perisian boleh menyelesaikannya. Setiap hantaran disemak sebelum dipaparkan secara umum.',
    submitted: 'Terima kasih! Idea anda telah dihantar dan akan dipaparkan di sini selepas disemak.',
    theProblem: 'Masalahnya *',
    yourIdea: 'Idea anda *',
    problemPlaceholder: 'Masalah apa dalam kementerian ini yang boleh dibantu oleh perisian?',
    ideaPlaceholder: 'Bagaimana perisian boleh menyelesaikannya?',
    yourName: 'Nama anda (pilihan)',
    contact: 'Hubungan (pilihan)',
    contactPlaceholder: 'E-mel atau @handle',
    submitButton: 'Hantar idea',
    langLabel: 'EN',
  },
} as const;

/** Path prefix for a locale ('' for the default English, '/ms' for Malay). */
export function localePrefix(locale: Locale): string {
  return locale === 'ms' ? '/ms' : '';
}
