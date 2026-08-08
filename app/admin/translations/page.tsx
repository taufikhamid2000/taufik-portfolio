import { createClient } from '../../../lib/supabase/server';
import { backfillTranslations } from './actions';
import { getIsOwner } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export default async function TranslationsPage({
  searchParams,
}: {
  searchParams: Promise<{ done?: string; error?: string }>;
}) {
  const { done, error } = await searchParams;
  const isOwner = await getIsOwner();
  const supabase = await createClient();

  const [{ count: ministriesTodo }, { count: initiativesTodo }] = await Promise.all([
    supabase.from('ministries').select('id', { count: 'exact', head: true }).or('name_ms.is.null,description_ms.is.null'),
    supabase.from('initiatives').select('id', { count: 'exact', head: true }).or('problem_ms.is.null,idea_ms.is.null'),
  ]);

  const pending = (ministriesTodo ?? 0) + (initiativesTodo ?? 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Translations</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
        Generate Bahasa Malaysia translations for the vision pages using Claude (Haiku 4.5).
        Only untranslated rows are processed, so this is safe to re-run.
      </p>

      {done !== undefined && (
        <div className="mb-6 p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-900/40 text-sm text-green-800 dark:text-green-300">
          Done — translated {done} record{done === '1' ? '' : 's'}.
        </div>
      )}
      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-900/40 text-sm text-red-800 dark:text-red-300">
          {error.includes('ANTHROPIC_API_KEY') || error.toLowerCase().includes('api key') || error.includes('401')
            ? 'Translation failed — ANTHROPIC_API_KEY is not set on this deployment. Add it in Vercel → Environment Variables, redeploy, then run this again.'
            : error}
        </div>
      )}

      <div className="border border-gray-200 dark:border-white/10 rounded-lg dark:rounded-2xl dark:bg-white/[0.03] dark:backdrop-blur-xl p-6">
        <p className="text-sm mb-4">
          {pending === 0
            ? 'All content is translated. ✓'
            : `${pending} record${pending === 1 ? '' : 's'} still need Bahasa Malaysia translations (${ministriesTodo ?? 0} ministries, ${initiativesTodo ?? 0} initiatives).`}
        </p>
        {isOwner && (
          <>
            <form action={backfillTranslations}>
              <button
                type="submit"
                disabled={pending === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                Translate missing content to BM
              </button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              Note: this calls the Anthropic API and may take a moment per record. Requires <code>ANTHROPIC_API_KEY</code> in the environment.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
