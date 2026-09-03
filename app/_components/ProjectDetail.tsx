import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '../../lib/projects';
import { gradientForProject, statusLabels, statusStyles } from '../../lib/project-status';

/**
 * Presentational content shared by ProjectCardTilt (grid card) and
 * ProjectWheel (wheel center panel): image/gradient header, name, status
 * pill, tagline, description, tech chips, and the GitHub/Live Demo link
 * row (falling back to "View in Portfolio" when both URLs are null).
 *
 * `headerClassName` lets callers size the header differently (card vs.
 * large center panel). `liveRegion` wraps the name+tagline in a tightly
 * scoped aria-live region so screen readers announce wheel selection
 * changes without re-announcing the whole panel (images, links, etc.).
 */
export default function ProjectDetail({
  project,
  headerClassName = 'aspect-[16/10]',
  liveRegion = false,
}: {
  project: Project;
  headerClassName?: string;
  liveRegion?: boolean;
}) {
  const nameAndTagline = (
    <>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[project.status]}`}
        >
          {statusLabels[project.status]}
        </span>
      </div>
      <p className="text-sm text-foreground/50 mb-3">{project.tagline}</p>
    </>
  );

  return (
    <>
      {project.image_url ? (
        <div className={`relative w-full overflow-hidden border-b border-border bg-muted ${headerClassName}`}>
          <Image
            src={project.image_url}
            alt={`${project.name} screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div
          className={`bg-gradient-to-br ${gradientForProject(project.id)} opacity-80 dark:opacity-70 ${headerClassName.includes('aspect') ? headerClassName : 'h-20'}`}
          aria-hidden="true"
        />
      )}
      <div className="relative z-0 p-4 md:p-6 flex flex-col flex-grow">
        {liveRegion ? (
          <div aria-live="polite">{nameAndTagline}</div>
        ) : (
          nameAndTagline
        )}
        <p className="text-sm mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded bg-muted text-foreground/70">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 text-sm">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-cyan-300 hover:underline"
            >
              GitHub &rarr;
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-cyan-300 hover:underline"
            >
              Live Demo &rarr;
            </a>
          )}
          {!project.github_url && !project.demo_url && (
            <Link
              href={`/projects/${project.name}`}
              className="text-primary dark:text-cyan-300 hover:underline"
            >
              View in Portfolio &rarr;
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
