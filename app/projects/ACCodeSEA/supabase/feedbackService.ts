import supabase from '../../../../lib/supabaseClient';

export const insertFeedback = async (feedback: { name: string; feedback: string }) => {
  return await supabase.from('ac_code_sea_feedback').insert([feedback]);
};

export const getAllFeedback = async () => {
  return await supabase.from('ac_code_sea_feedback').select('*');
};

export const updateFeedback = async (id: number, updatedFeedback: { name: string; feedback: string }) => {
    return await supabase
      .from('ac_code_sea_feedback')
      .update(updatedFeedback)
      .eq('id', id);
  };
  
  export const deleteFeedback = async (id: number) => {
    return await supabase
      .from('ac_code_sea_feedback')
      .delete()
      .eq('id', id);
  };