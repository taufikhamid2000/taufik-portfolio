import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabaseClient';

export async function GET(request: Request) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'subjects'; // Default to 'subjects'
    const parentId = searchParams.get('parentId') || null;

    // Debugging logs
    console.log('Fetching hierarchy data:', { type, parentId });

    // Define table name based on type
    let tableName: string;
    switch (type) {
      case 'levels':
        tableName = 'levels';
        break;
      case 'subjects':
        tableName = 'subjects';
        break;
      case 'chapters':
        tableName = 'chapters';
        break;
      case 'lessons':
        tableName = 'lessons';
        break;
      case 'quizzes':
        tableName = 'quizzes';
        break;
      default:
        return NextResponse.json({ message: 'Invalid type parameter' }, { status: 400 });
    }

    // Use the correct schema by dynamically setting the search path
    await supabase.rpc('set_search_path', { schema_name: 'syllabuzz' });

    // Build the query
    let query = supabase.from(tableName).select('*');
    if (parentId) {
      const foreignKey =
        type === 'chapters'
          ? 'subject_id'
          : type === 'lessons'
          ? 'chapter_id'
          : type === 'quizzes'
          ? 'lesson_id'
          : null;

      if (foreignKey) {
        query = query.eq(foreignKey, parentId);
      }
    }

    // Execute the query
    const { data, error } = await query;

    // Log Supabase query results and errors
    console.log('Fetched Data:', data);
    if (error) {
      console.error('Supabase Query Error:', error);
      return NextResponse.json({ message: 'Database error', error: error.message }, { status: 500 });
    }

    // Return data as JSON response
    return NextResponse.json(data);
  } catch (error: any) {
    // Handle unexpected errors
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
