'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../pes.css';

export interface PesProject {
  id: string;
  name: string;
  tagline: string;
  image_url: string | null;
  featured: boolean;
  status: string;
}

type IconId =
  | 'projects'
  | 'featured'
  | 'vision'
  | 'sprints'
  | 'about'
  | 'contact'
  | 'archive'
  | 'settings';

interface MenuItem {
  id: IconId;
  label: string;
  title: string;
  description: string;
}

const MENU: MenuItem[] = [
  { id: 'projects', label: 'Projects', title: 'PROJECTS', description: 'Browse every project as a player card, filtered by status.' },
  { id: 'featured', label: 'Featured', title: 'FEATURED', description: 'The star players: my strongest, most complete work.' },
  { id: 'vision', label: 'Vision', title: 'VISION', description: 'Ministries and initiatives: where this portfolio is heading.' },
  { id: 'sprints', label: 'Sprints', title: 'SPRINTS', description: 'What is being built right now, and how far along it is.' },
  { id: 'about', label: 'About', title: 'ABOUT', description: 'Background, skills and the story so far.' },
  { id: 'contact', label: 'Contact', title: 'CONTACT', description: 'Get in touch for a full-stack or backend role.' },
  { id: 'archive', label: 'Archive', title: 'ARCHIVE', description: 'Retired and archived projects from the gallery.' },
  { id: 'settings', label: 'Options', title: 'OPTIONS', description: 'Theme, language and motion preferences.' },
];

const ICON_PATHS: Record<IconId, React.ReactNode> = {
  projects: (
    <>
      <rect x="6" y="8" width="20" height="26" rx="2" />
      <rect x="30" y="8" width="20" height="26" rx="2" />
      <path d="M6 42h44M6 48h30" />
    </>
  ),
  featured: <path d="M28 6l6.4 13.2 14.6 2.1-10.5 10.2 2.5 14.5L28 39l-13 6.9 2.5-14.5L7 21.3l14.6-2.1z" />,
  vision: (
    <>
      <circle cx="28" cy="28" r="9" />
      <path d="M4 28C11 15 20 9 28 9s17 6 24 19c-7 13-16 19-24 19S11 41 4 28z" />
    </>
  ),
  sprints: (
    <>
      <path d="M8 44V22M20 44V12M32 44V30M44 44V18" />
      <path d="M4 48h48" />
    </>
  ),
  about: (
    <>
      <circle cx="28" cy="18" r="8" />
      <path d="M10 48c0-11 8-17 18-17s18 6 18 17" />
    </>
  ),
  contact: (
    <>
      <rect x="5" y="12" width="46" height="32" rx="3" />
      <path d="M5 16l23 17 23-17" />
    </>
  ),
  archive: (
    <>
      <rect x="6" y="8" width="44" height="12" rx="2" />
      <path d="M10 20v24a2 2 0 002 2h32a2 2 0 002-2V20M22 30h12" />
    </>
  ),
  settings: (
    <>
      <circle cx="28" cy="28" r="7" />
      <path d="M28 4v8M28 44v8M4 28h8M44 28h8M11 11l6 6M39 39l6 6M45 11l-6 6M17 39l-6 6" />
    </>
  ),
};

const Icon = memo(function Icon({ id }: { id: IconId }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[id]}
    </svg>
  );
});

function Emblem({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 140" aria-hidden="true">
      <defs>
        <linearGradient id="pes-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f8ff" />
          <stop offset="1" stopColor="#9db4dc" />
        </linearGradient>
      </defs>
      <path d="M60 4l50 16v52c0 32-22 52-50 64C32 124 10 104 10 72V20z" fill="url(#pes-shield)" stroke="#dbe7ff" strokeWidth="3" />
      <path d="M60 14l40 13v45c0 26-17 43-40 53-23-10-40-27-40-53V27z" fill="#0a2a66" />
      <text x="60" y="80" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="42" fill="#f4f8ff" letterSpacing="2">TP</text>
      <text x="60" y="106" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill="#6cb0ff" letterSpacing="3">2026</text>
    </svg>
  );
}

function useClock() {
  const [now, setNow] = useState<string>('--:--');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
    };
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

const Tile = memo(function Tile({
  item,
  selected,
  index,
  onSelect,
  onConfirm,
}: {
  item: MenuItem;
  selected: boolean;
  index: number;
  onSelect: (i: number) => void;
  onConfirm: (i: number) => void;
}) {
  return (
    <button
      type="button"
      className="pes-tile"
      aria-current={selected}
      aria-label={item.label}
      data-index={index}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') onSelect(index);
      }}
      onClick={() => (selected ? onConfirm(index) : onSelect(index))}
    >
      <Icon id={item.id} />
      <span>{item.label}</span>
    </button>
  );
});

export default function PesApp({ projects }: { projects: PesProject[] }) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [openId, setOpenId] = useState<IconId | null>(null);
  const clock = useClock();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openId) cardRef.current?.focus();
  }, [openId]);

  const heroes = useMemo(
    () => projects.filter((p) => p.image_url && p.status !== 'concept' && p.status !== 'archived'),
    [projects],
  );
  const [heroIndex, setHeroIndex] = useState(0);

  // Slowly cycle the hero through featured projects so the backdrop isn't static.
  useEffect(() => {
    if (!started || heroes.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setHeroIndex((h) => (h + 1) % heroes.length), 5500);
    return () => window.clearInterval(id);
  }, [started, heroes.length]);

  const move = useCallback((delta: number) => {
    setIndex((i) => (i + delta + MENU.length) % MENU.length);
  }, []);

  const confirm = useCallback((i: number) => setOpenId(MENU[i].id), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!started) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setStarted(true);
        }
        return;
      }
      if (openId) {
        if (e.key === 'Escape' || e.key === 'Backspace') {
          e.preventDefault();
          setOpenId(null);
        }
        return;
      }
      // preventDefault stops the same Enter press from also activating
      // whatever the dialog focuses once it opens.
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        move(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        move(-1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        confirm(index);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setIndex(MENU.length - 1);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, openId, index, move, confirm]);

  // Center the selected tile in the (touch) tile row. Scrolls only that row:
  // scrollIntoView would also scroll the overflow:hidden root and shift the scene.
  useEffect(() => {
    if (!started) return;
    const tile = document.querySelector<HTMLElement>(`.pes-tile[data-index="${index}"]`);
    const row = tile?.parentElement;
    if (!tile || !row) return;
    const t = tile.getBoundingClientRect();
    const r = row.getBoundingClientRect();
    const delta = t.left + t.width / 2 - (r.left + r.width / 2);
    if (Math.abs(delta) > 1) row.scrollBy({ left: delta, behavior: 'smooth' });
  }, [index, started]);

  const current = MENU[index];
  const opened = openId ? MENU.find((m) => m.id === openId) : null;

  return (
    <div className="pes-root" role="application" aria-label="Portfolio menu">
      <div className="pes-bg" />
      <div className="pes-slab pes-slab--tl" />
      <div className="pes-slab pes-slab--tr" />
      <div className="pes-slab pes-slab--bl" />

      {!started ? (
        <button type="button" className="pes-title" onClick={() => setStarted(true)} aria-label="Press start">
          <Emblem className="pes-title-logo pes-enter" />
          <div className="pes-title-name pes-enter pes-enter--d1">TAUFIK</div>
          <div className="pes-title-sub pes-enter pes-enter--d1">PORTFOLIO EDITION</div>
          <div className="pes-start pes-enter pes-enter--d2">PRESS START</div>
        </button>
      ) : (
        <>
          <header className="pes-topbar pes-enter">
            <div className="pes-pill" aria-hidden="true">
              <b>{clock}</b>
              <span>{projects.length} PROJECTS</span>
            </div>
            <div className="pes-brand">
              <div className="pes-brand-name">
                TAUFIK
                <span>PORTFOLIO</span>
              </div>
              <Emblem className="pes-emblem" />
            </div>
          </header>

          <div className="pes-hero pes-enter pes-enter--d1" aria-hidden="true">
            <div className="pes-hero-frame" />
            <div className="pes-hero-inner">
              {heroes.map((p, i) => (
                <Image
                  key={p.id}
                  src={p.image_url as string}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 84vw, 620px"
                  priority={i === 0}
                  className="pes-hero-img"
                  data-on={i === heroIndex}
                />
              ))}
              <div className="pes-hero-shade" />
              {heroes[heroIndex] && (
                <div className="pes-hero-caption">
                  <span className="pes-hero-name">{heroes[heroIndex].name}</span>
                  <span className="pes-hero-tag">{heroes[heroIndex].tagline}</span>
                </div>
              )}
            </div>
          </div>

          <nav className="pes-bar pes-enter pes-enter--d2" aria-label="Main menu">
            <div className="pes-bar-outer" />
            <div className="pes-bar-inner" />
            <div className="pes-bar-content">
              <div className="pes-mode-mark" aria-hidden="true">
                <Emblem />
                MENU
              </div>
              <div className="pes-mode-title" aria-live="polite">
                {current.title}
              </div>
              <div className="pes-tiles" role="list">
                {MENU.map((item, i) => (
                  <Tile key={item.id} item={item} index={i} selected={i === index} onSelect={setIndex} onConfirm={confirm} />
                ))}
              </div>
            </div>
          </nav>

          <p className="pes-desc pes-enter pes-enter--d2">{current.description}</p>

          <div className="pes-hints" aria-hidden="true">
            <span className="pes-hint">
              <span className="pes-key pes-key--arrows">&larr;&rarr;</span> Select
            </span>
            <span className="pes-hint">
              <span className="pes-key">&#8629;</span> Confirm
            </span>
            <span className="pes-hint">
              <span className="pes-key pes-key--back">Esc</span> Back
            </span>
          </div>

          {opened && (
            <div className="pes-screen" role="dialog" aria-modal="true" aria-label={opened.title}>
              <div className="pes-screen-card pes-enter" tabIndex={-1} ref={cardRef}>
                <h2>{opened.title}</h2>
                <p>
                  {opened.description} This screen is built in a later phase; for now the classic site has the full
                  content.
                </p>
                <div className="pes-screen-actions">
                  <Link href="/" className="pes-btn">
                    OPEN CLASSIC SITE
                  </Link>
                  <button type="button" className="pes-btn pes-btn--ghost" onClick={() => setOpenId(null)}>
                    BACK
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
