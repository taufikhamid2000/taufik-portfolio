'use client';

import { useId, useState } from 'react';

/**
 * Collapsed-by-default disclosure for the hero's bio paragraphs + chips.
 * Same grid-template-rows animation trick as SiteShell's SidebarGroup —
 * matched intentionally rather than reinventing a <details> element.
 */
export default function BioDisclosure({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={contentId}
        className="mb-3 flex cursor-pointer items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
      >
        <ChevronIcon open={open} />
        {open ? 'Show less' : 'More about me'}
      </button>
      <div
        id={contentId}
        className="grid transition-[grid-template-rows] duration-200 md:duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
    >
      <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
