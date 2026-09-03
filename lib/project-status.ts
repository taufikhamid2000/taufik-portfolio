import type { ProjectStatus } from './projects';

/**
 * Shared status → style/label mapping used by ProjectCardTilt and
 * ProjectWheel so the two don't drift out of sync.
 */
export const statusStyles: Record<ProjectStatus, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-300',
  'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-300',
  'in-portfolio': 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-300',
  concept: 'bg-gray-100 text-gray-800 dark:bg-white/5 dark:text-gray-300',
  archived: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400',
};

export const statusLabels: Record<ProjectStatus, string> = {
  active: 'Active',
  'in-progress': 'In Progress',
  'in-portfolio': 'In Portfolio',
  concept: 'Concept',
  archived: 'Archived',
};

/**
 * Dot colors for the ProjectWheel — a compact, high-contrast fill/ring
 * per status, distinct from the pill background colors above.
 */
export const statusDotColors: Record<ProjectStatus, string> = {
  active: '#22c55e',
  'in-progress': '#eab308',
  'in-portfolio': '#3b82f6',
  concept: '#9ca3af',
  archived: '#6b7280',
};

// Deterministic gradient per card, used as the header fallback when a
// project has no image_url, so each card still gets a distinct header.
const cardGradients = [
  'from-indigo-500 to-cyan-400',
  'from-fuchsia-500 to-orange-400',
  'from-emerald-500 to-teal-400',
  'from-violet-500 to-pink-400',
  'from-amber-500 to-rose-400',
  'from-sky-500 to-indigo-400',
];

export function gradientForProject(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return cardGradients[hash % cardGradients.length];
}
