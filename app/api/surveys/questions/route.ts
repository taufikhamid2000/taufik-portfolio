import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        const { survey_id, question_text, question_type } = req.body;
        
        const { data: newQuestion, error: insertError } = await supabase
          .from('survey_questions')
          .insert([{ survey_id, question_text, question_type }])
          .single();

        if (insertError) {
          return res.status(500).json({ error: 'Failed to create question' });
        }

        res.status(201).json(newQuestion);
        break;

      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}