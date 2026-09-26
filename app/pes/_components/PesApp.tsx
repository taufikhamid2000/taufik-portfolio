'use client';

import Image from 'next/image';
import { memo, useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import '../pes.css';
import { PES_DICT } from '../pes-i18n';
import type { MenuId, PesCommit, PesLocale, PesSite, PesSprint, PesVisionData } from '../types';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import { PesLocaleProvider } from './PesLocale';
import { go, subscribeHash } from './nav';
import AdminScreen from './AdminScreen';
import LoginScreen from './LoginScreen';
import OptionsScreen from './OptionsScreen';
import ProjectsScreen from './ProjectsScreen';
import SprintsScreen from './SprintsScreen';
import VisionScreen from './VisionScreen';
import { useMediaQuery, usePref } from './usePref';
import { useSound } from './useSound';

export interface PesProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  featured: boolean;
  status: string;
  display_order: number;
}

type IconId = MenuId;

const PUBLIC_MENU: IconId[] = ['projects', 'featured', 'vision', 'sprints', 'about', 'contact', 'archive', 'settings'];

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
  admin: (
    <>
      <path d="M28 4l20 8v14c0 14-9 22-20 26C17 48 8 40 8 26V12z" />
      <path d="M19 28l7 7 12-14" />
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

// Own component so the 15s clock tick re-renders only this <b>, not the whole menu.
function Clock() {
  return <b>{useClock()}</b>;
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
  id,
  label,
  selected,
  index,
  onSelect,
  onConfirm,
}: {
  id: IconId;
  label: string;
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
      aria-label={label}
      data-index={index}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') onSelect(index);
      }}
      onClick={() => (selected ? onConfirm(index) : onSelect(index))}
    >
      <Icon id={id} />
      <span>{label}</span>
    </button>
  );
});

const MOTION_KEY = 'pes-reduce-motion';
const LOCALE_KEY = 'pes-locale';

export default function PesApp({
  projects,
  vision,
  sprints,
  commits,
  isOwner,
  site,
}: {
  projects: PesProject[];
  vision: Record<PesLocale, PesVisionData>;
  sprints: PesSprint[];
  commits: PesCommit[];
  isOwner: boolean;
  site: PesSite;
}) {
  const hash = useSyncExternalStore(
    subscribeHash,
    () => window.location.hash,
    () => '',
  );
  const hashId = hash.slice(1).split('/')[0];
  // The Admin tile exists only for the owner.
  const menu = useMemo<IconId[]>(() => (isOwner ? [...PUBLIC_MENU, 'admin'] : PUBLIC_MENU), [isOwner]);
  const openId: IconId | null = (menu as string[]).includes(hashId) ? (hashId as IconId) : null;
  const loginOpen = hashId === 'login';
  const started = hashId === 'menu' || openId !== null || loginOpen;
  const [index, setIndex] = useState(0);
  // A deep link (#sprints) should leave the matching tile selected once the screen closes.
  const [seenOpen, setSeenOpen] = useState<IconId | null>(null);
  if (openId !== seenOpen) {
    setSeenOpen(openId);
    if (openId) setIndex(menu.indexOf(openId));
  }
  const [localePref, setLocalePref] = usePref(LOCALE_KEY);
  const [motionPref, setMotionPref] = usePref(MOTION_KEY);
  const [rotatePref, setRotatePref] = usePref('pes-rotate-dismissed');
  const [soundPref, setSoundPref] = usePref('pes-sound');
  const osReduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const sound = soundPref === '1';
  const play = useSound(sound);
  const setSound = useCallback((v: boolean) => setSoundPref(v ? '1' : '0'), [setSoundPref]);
  const close = useCallback(() => {
    if (window.history.state?.pes) window.history.back();
    else go('#menu', 'replace');
    play('back');
    // Return focus to the selected tile so keyboard users don't land on <body>.
    requestAnimationFrame(() => document.querySelector<HTMLElement>('.pes-tile[aria-current="true"]')?.focus());
  }, [play]);

  const locale: PesLocale = localePref === 'ms' ? 'ms' : 'en';
  // An explicit choice wins; otherwise follow the OS setting.
  const reduceMotion = motionPref === '1' || (motionPref === '' && osReduceMotion);
  const setLocale = useCallback((l: PesLocale) => setLocalePref(l), [setLocalePref]);
  const setReduceMotion = useCallback((v: boolean) => setMotionPref(v ? '1' : '0'), [setMotionPref]);

  const heroes = useMemo(
    () => projects.filter((p) => p.image_url && p.status !== 'concept' && p.status !== 'archived'),
    [projects],
  );
  const [heroIndex, setHeroIndex] = useState(0);

  // Slowly cycle the hero through featured projects so the backdrop isn't static.
  useEffect(() => {
    if (!started || heroes.length < 2 || reduceMotion) return;
    const id = window.setInterval(() => setHeroIndex((h) => (h + 1) % heroes.length), 5500);
    return () => window.clearInterval(id);
  }, [started, heroes.length, reduceMotion]);

  const move = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + menu.length) % menu.length);
      play('move');
    },
    [play, menu],
  );

  const select = useCallback(
    (i: number) => {
      setIndex(i);
      play('move');
    },
    [play],
  );

  const confirm = useCallback(
    (i: number) => {
      go('#' + menu[i], 'push');
      play('confirm');
    },
    [play, menu],
  );

  const start = useCallback(() => {
    go('#menu', 'push');
    play('confirm');
  }, [play]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!started) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          start();
        }
        return;
      }
      if (openId || loginOpen) {
        const typing = (e.target as HTMLElement | null)?.closest('input, textarea, select');
        if (e.key === 'Escape' || (e.key === 'Backspace' && !typing)) {
          e.preventDefault();
          close();
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
        setIndex(menu.length - 1);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, openId, loginOpen, index, menu, move, confirm, start, close]);

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

  // Horizontal swipe on the menu changes the selected tile (the tile row itself doesn't scroll on touch).
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    swipeStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = swipeStart.current;
    swipeStart.current = null;
    if (!s || !started || openId || loginOpen) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
  };

  const t = PES_DICT[locale];
  const current = t.menu[menu[Math.min(index, menu.length - 1)]];
  const opened = openId ? { id: openId } : null;

  return (
    <PesLocaleProvider value={locale}>
    <div
      id="main-content"
      className={`pes-root${reduceMotion ? ' pes-reduce' : ''}`}
      role="application"
      aria-label="Portfolio menu"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="pes-bg" />
      <div className="pes-slab pes-slab--tl" />
      <div className="pes-slab pes-slab--tr" />
      <div className="pes-slab pes-slab--bl" />

      {!started ? (
        <>
          <button type="button" className="pes-title" onClick={start} aria-label="Press start">
            <Emblem className="pes-title-logo pes-enter" />
            <div className="pes-title-name pes-enter pes-enter--d1">TAUFIK</div>
            <div className="pes-title-sub pes-enter pes-enter--d1">{t.title.edition}</div>
            <div className="pes-start pes-enter pes-enter--d2">{t.title.start}</div>
          </button>
          <a className="pes-classic-link" href="/classic">
            {t.title.classic}
          </a>
        </>
      ) : (
        <>
          <header className="pes-topbar pes-enter">
            <div className="pes-pill" aria-hidden="true">
              <Clock />
              <span>{t.pill(projects.length)}</span>
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
              {/* Only previous/current/next are mounted: enough for the cross-fade and
                  a preloaded next image, without decoding all of them. */}
              {heroes.map((p, i) => {
                const n = heroes.length;
                const near = i === heroIndex || i === (heroIndex + 1) % n || i === (heroIndex - 1 + n) % n;
                if (!near) return null;
                return (
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
                );
              })}
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
                {menu.map((id, i) => (
                  <Tile key={id} id={id} label={t.menu[id].label} index={i} selected={i === index} onSelect={select} onConfirm={confirm} />
                ))}
              </div>
            </div>
          </nav>

          <p className="pes-desc pes-enter pes-enter--d2">{current.description}</p>

          <div className="pes-dots" aria-hidden="true">
            {menu.map((m, i) => (
              <i key={m} data-on={i === index} />
            ))}
          </div>
          <button type="button" className="pes-btn pes-open" onClick={() => confirm(index)}>
            {t.openBtn(current.label.toUpperCase())}
          </button>

          {rotatePref !== '1' && (
            <div className="pes-rotate" role="note">
              <span>{t.rotate}</span>
              <button type="button" aria-label={t.dismiss} onClick={() => setRotatePref('1')}>
                &times;
              </button>
            </div>
          )}

          {!isOwner && (
            <button type="button" className="pes-admin-link" onClick={() => go('#login', 'push')}>
              Sign in
            </button>
          )}

          <div className="pes-hints" aria-hidden="true">
            <span className="pes-hint">
              <span className="pes-key pes-key--arrows">&larr;&rarr;</span> {t.hints.select}
            </span>
            <span className="pes-hint">
              <span className="pes-key">&#8629;</span> {t.hints.confirm}
            </span>
            <span className="pes-hint">
              <span className="pes-key pes-key--back">Esc</span> {t.hints.back}
            </span>
          </div>

          {opened && (opened.id === 'projects' || opened.id === 'featured' || opened.id === 'archive') && (
            <ProjectsScreen mode={opened.id} projects={projects} isOwner={isOwner} onBack={close} />
          )}

          {opened?.id === 'vision' && <VisionScreen data={vision[locale]} locale={locale} onBack={close} />}
          {opened?.id === 'sprints' && <SprintsScreen sprints={sprints} commits={commits} isOwner={isOwner} onBack={close} />}
          {opened?.id === 'admin' && <AdminScreen onBack={close} />}
          {loginOpen && <LoginScreen isOwner={isOwner} onBack={close} />}
          {opened?.id === 'about' && <AboutScreen site={site} projects={projects} onBack={close} />}
          {opened?.id === 'contact' && <ContactScreen site={site} locale={locale} onBack={close} />}
          {opened?.id === 'settings' && (
            <OptionsScreen
              locale={locale}
              reduceMotion={reduceMotion}
              onLocale={setLocale}
              onReduceMotion={setReduceMotion}
              sound={sound}
              onSound={setSound}
              onBack={close}
            />
          )}
        </>
      )}
    </div>
    </PesLocaleProvider>
  );
}
