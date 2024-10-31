// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const dashboardRoutes = require('./api/dashboardRoutes');

// Load environment variables from .env file
dotenv.config();

// Create an instance of an Express app
const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Supabase Client Setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Basic GET route to check server status
app.get('/', (req, res) => {
  res.send('Welcome to Veyoyee!');
});

// Sample GET endpoint to fetch all surveys
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

// Sample POST endpoint to create a new survey
app.post('/api/surveys', async (req, res) => {
  const { creator_id, title, description, reward_amount } = req.body;

  try {
    const { data, error } = await supabase
      .from('Surveys')
      .insert([{ creator_id, title, description, reward_amount }]);

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Error creating survey:', err);
    res.status(500).send('Server Error');
  }
});

// Use the imported dashboard routes
app.use('/api', dashboardRoutes);

// Middleware to handle 404 errors
app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
