// Fetch all active surveys
app.get('/api/surveys', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Surveys')
      .select('*')
      .eq('is_active', true);

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching surveys:', err);
    res.status(500).send('Server Error');
  }
});
