import { getAllSubmissions } from '../../../lib/vision';
import { approveSubmission, rejectSubmission, deleteSubmission } from './actions';
import Reveal from '../../_components/Reveal';
import TiltWrapper from '../../_components/TiltWrapper';

export const dynamic = 'force-dynamic';

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  rejected: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default async function SubmissionsPage() {
  const submissions = await getAllSubmissions();
  const pending = submissions.filter((s) => s.status === 'pending');
  const reviewed = submissions.filter((s) => s.status !== 'pending');

  return (
    <div>
      <Reveal>
        <h1 className="text-2xl font-bold mb-1">Idea Submissions</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
          Public submissions from the vision pages. Approved ones appear publicly under their ministry.
        </p>
      </Reveal>

      <section className="mb-10">
        <Reveal>
          <h2 className="text-lg font-semibold mb-4">
            Pending review {pending.length > 0 && <span className="text-sm font-normal text-gray-500">({pending.length})</span>}
          </h2>
        </Reveal>
        {pending.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Nothing waiting for review.</p>
        ) : (
          <div className="space-y-4">
            {pending.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <SubmissionCard s={s} pending />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {reviewed.length > 0 && (
        <section>
          <Reveal>
            <h2 className="text-lg font-semibold mb-4">Reviewed</h2>
          </Reveal>
          <div className="space-y-4">
            {reviewed.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <SubmissionCard s={s} pending={false} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SubmissionCard({
  s,
  pending,
}: {
  s: Awaited<ReturnType<typeof getAllSubmissions>>[number];
  pending: boolean;
}) {
  return (
    <TiltWrapper className="rounded-lg dark:rounded-2xl">
      <article className="border border-gray-200 dark:border-white/10 rounded-lg dark:rounded-2xl dark:bg-white/[0.03] dark:backdrop-blur-xl p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {s.ministry?.name ?? 'No ministry specified'}
            {' · '}
            {new Date(s.created_at).toLocaleDateString()}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[s.status]}`}>
            {s.status}
          </span>
        </div>
        <p className="text-sm mb-2 text-gray-700 dark:text-gray-300"><span className="font-semibold">Problem:</span> {s.problem}</p>
        <p className="text-sm mb-3 text-gray-700 dark:text-gray-300"><span className="font-semibold">Idea:</span> {s.idea}</p>
        {(s.submitter_name || s.submitter_contact) && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {s.submitter_name && <span>{s.submitter_name}</span>}
            {s.submitter_name && s.submitter_contact && ' · '}
            {s.submitter_contact && <span>{s.submitter_contact}</span>}
          </p>
        )}
        <div className="flex flex-wrap gap-2 text-sm">
          {pending && (
            <>
              <form action={approveSubmission}>
                <input type="hidden" name="id" value={s.id} />
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">Approve</button>
              </form>
              <form action={rejectSubmission}>
                <input type="hidden" name="id" value={s.id} />
                <button type="submit" className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Reject</button>
              </form>
            </>
          )}
          <form action={deleteSubmission}>
            <input type="hidden" name="id" value={s.id} />
            <button type="submit" className="px-3 py-1.5 rounded-lg border border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors">Delete</button>
          </form>
        </div>
      </article>
    </TiltWrapper>
  );
}
