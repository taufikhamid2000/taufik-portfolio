import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        const { data: question, error: fetchError } = await supabase
          .from('survey_questions')
          .select('*')
          .eq('question_id', id)
          .single();

        if (fetchError || !question) {
          return res.status(404).json({ error: 'Question not found' });
        }

        res.status(200).json(question);
        break;

      case 'PUT':
        const { question_text, question_type } = req.body;

        const { error: updateError } = await supabase
          .from('survey_questions')
          .update({ question_text, question_type })
          .eq('question_id', id);

        if (updateError) {
          return res.status(500).json({ error: 'Failed to update question' });
        }

        res.status(200).json({ message: 'Question updated successfully' });
        break;

      case 'DELETE':
        const { error: deleteError } = await supabase
          .from('survey_questions')
          .delete()
          .eq('question_id', id);

        if (deleteError) {
          return res.status(500).json({ error: 'Failed to delete question' });
        }

        res.status(200).json({ message: 'Question deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
