// app/projects/TekaTeki/utils/quizzesService.ts

import supabase from '../../../../lib/supabaseClient'; // Adjust the path based on your project structure

export interface Quiz {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export async function fetchQuizzes(): Promise<Quiz[]> {
  const { data, error } = await supabase
    .from('quizzes') // Using the 'public' schema by default
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quizzes:', error);
    throw error; // Propagate the error to be handled by the caller
  }

  return data as Quiz[];
}
