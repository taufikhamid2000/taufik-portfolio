import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();

// Supabase Client Setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to ensure authenticated access
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data) return res.status(401).send('Unauthorized');

  req.user = data.user;
  next();
};

// Fetch all active surveys - available to all authenticated users
router.get('/surveys', authMiddleware, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Surveys')
      .select('*')
      .eq('is_active', true);
    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching surveys:', err);
    res.status(500).send('Server Error');
  }
});

// Fetch all surveys created by the authenticated user
router.get('/my-surveys', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const { data, error } = await supabase
      .from('Surveys')
      .select('*')
      .eq('creator_id', userId);
    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching user surveys:', err);
    res.status(500).send('Server Error');
  }
});

// Create a new survey
router.post('/surveys', authMiddleware, async (req, res) => {
  const { title, description, reward_amount } = req.body;
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('Surveys')
      .insert([{ creator_id: userId, title, description, reward_amount }])
      .select();
    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Error creating survey:', err);
    res.status(500).send('Server Error');
  }
});

// Update survey status (activate/deactivate)
router.put('/surveys/:surveyId/status', authMiddleware, async (req, res) => {
  const surveyId = req.params.surveyId;
  const { is_active } = req.body;

  try {
    const { error } = await supabase
      .from('Surveys')
      .update({ is_active })
      .eq('survey_id', surveyId);
    if (error) throw error;

    res.status(200).send('Survey status updated successfully');
  } catch (err) {
    console.error('Error updating survey status:', err);
    res.status(500).send('Server Error');
  }
});

// Soft delete a survey
router.delete('/surveys/:surveyId', authMiddleware, async (req, res) => {
  const surveyId = req.params.surveyId;

  try {
    const { error } = await supabase
      .from('Surveys')
      .update({ is_active: false })
      .eq('survey_id', surveyId);
    if (error) throw error;

    res.status(200).send('Survey deleted (deactivated) successfully');
  } catch (err) {
    console.error('Error deleting survey:', err);
    res.status(500).send('Server Error');
  }
});

export default router;
