import supabase from './lib/supabaseClient'; // Make sure the path to your client is correct

(async () => {
  try {
    const { data, error } = await supabase.from('syllabuzz.subjects').select('*');

    if (error) {
      console.error('Database Query Error:', error);
    } else {
      console.log('Data:', data);
    }
  } catch (err) {
    console.error('Unexpected Error:', err);
  }
})();
