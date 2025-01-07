import supabase from '../../../../lib/supabaseClient';

export async function fetchHierarchyData(
  type: string,
  parentId?: string,
  levelId?: string
): Promise<any[]> {
  let query;

  try {
    // Build the query based on the type of data
    if (type === 'levels') {
      query = supabase.from('levels').select('*'); // Fetch all levels
    } else if (type === 'subjects') {
      query = supabase.from('subjects').select('id, name, level_id'); // Fetch subjects
      if (levelId) query = query.eq('level_id', levelId); // Filter by level_id if provided
    } else if (type === 'chapters') {
      query = supabase.from('chapters').select('*'); // Fetch chapters
      if (parentId) query = query.eq('subject_id', parentId); // Filter by subject_id if provided
    } else if (type === 'lessons') {
      query = supabase.from('lessons').select('*'); // Fetch lessons
      if (parentId) query = query.eq('chapter_id', parentId); // Filter by chapter_id if provided
    } else {
      throw new Error(`Invalid type parameter: ${type}`);
    }

    // Execute the query
    const { data, error } = await query.order('name', { ascending: true }); // Order by name for all types

    if (error) throw error; // Rethrow error for higher-level handling

    return data || []; // Return the data or an empty array
  } catch (err) {
    console.error('Error in fetchHierarchyData:', err);
    throw err; // Propagate the error
  }
}
