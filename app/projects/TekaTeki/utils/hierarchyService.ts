import supabase from '../../../../lib/supabaseClient';

export async function fetchHierarchyData(type: string, parentId?: string, levelId?: string): Promise<any[]> {
  try {
    let query;

    // Dynamically construct the query based on the type
    switch (type) {
      case 'levels':
        query = supabase.from('levels').select('*');
        break;
      case 'subjects':
        query = supabase.from('subjects').select('*');
        if (levelId) query = query.eq('level_id', levelId); // Filter by level
        break;
      case 'chapters':
        query = supabase.from('chapters').select('*');
        if (parentId) query = query.eq('subject_id', parentId); // Filter by subject
        break;
      case 'lessons':
        query = supabase.from('lessons').select('*');
        if (parentId) query = query.eq('chapter_id', parentId); // Filter by chapter
        break;
      default:
        throw new Error(`Invalid type parameter: ${type}`);
    }

    const { data, error } = await query.order('name', { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (err) {
    console.error('Error fetching hierarchy data:', err);
    throw err;
  }
}
