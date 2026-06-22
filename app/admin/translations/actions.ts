'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '../../../lib/supabase/server';
import { translateToMalay } from '../../../lib/translate';

/**
 * Fill missing Bahasa Malaysia translations for ministries + initiatives.
 * Runs as an authenticated admin (RLS allows the writes). Translates only
 * rows whose _ms column is still null, so it's safe to re-run.
 */
export async function backfillTranslations() {
  const supabase = await createClient();
  let done = 0;

  try {
    // Ministries
    const { data: ministries } = await supabase
      .from('ministries')
      .select('id, name, description, name_ms, description_ms')
      .or('name_ms.is.null,description_ms.is.null');

    for (const m of ministries ?? []) {
      const patch: Record<string, string> = {};
      if (!m.name_ms && m.name) patch.name_ms = await translateToMalay(m.name);
      if (!m.description_ms && m.description) patch.description_ms = await translateToMalay(m.description);
      if (Object.keys(patch).length) {
        await supabase.from('ministries').update(patch).eq('id', m.id);
        done++;
      }
    }

    // Initiatives
    const { data: initiatives } = await supabase
      .from('initiatives')
      .select('id, problem, idea, problem_ms, idea_ms')
      .or('problem_ms.is.null,idea_ms.is.null');

    for (const i of initiatives ?? []) {
      const patch: Record<string, string> = {};
      if (!i.problem_ms && i.problem) patch.problem_ms = await translateToMalay(i.problem);
      if (!i.idea_ms && i.idea) patch.idea_ms = await translateToMalay(i.idea);
      if (Object.keys(patch).length) {
        await supabase.from('initiatives').update(patch).eq('id', i.id);
        done++;
      }
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Translation failed';
    redirect('/admin/translations?error=' + encodeURIComponent(msg));
  }

  revalidatePath('/ms/vision', 'layout');
  redirect('/admin/translations?done=' + done);
}
