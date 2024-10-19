import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        const { data: survey, error: fetchError } = await supabase
          .from('surveys')
          .select('*')
          .eq('survey_id', id)
          .single();

        if (fetchError || !survey) {
          return res.status(404).json({ error: 'Survey not found' });
        }

        res.status(200).json(survey);
        break;

      case 'PUT':
        const { title, description, min_respondents, max_respondents, start_date, end_date } = req.body;

        const { error: updateError } = await supabase
          .from('surveys')
          .update({ title, description, min_respondents, max_respondents, start_date, end_date })
          .eq('survey_id', id);

        if (updateError) {
          return res.status(500).json({ error: 'Failed to update survey' });
        }

        res.status(200).json({ message: 'Survey updated successfully' });
        break;

      case 'DELETE':
        const { error: deleteError } = await supabase
          .from('surveys')
          .delete()
          .eq('survey_id', id);

        if (deleteError) {
          return res.status(500).json({ error: 'Failed to delete survey' });
        }

        res.status(200).json({ message: 'Survey deleted successfully' });
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
