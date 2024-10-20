// D:/taufik-portfolio/taufik-portfolio/app/projects/ACCodeSEA/feedback/FeedbackTable.tsx

/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { updateFeedback, deleteFeedback, getAllFeedback } from './../supabase/feedbackService';
import { Table, Button, Input } from '../../../../components/CommonComponents';
import { Feedback } from './types';

interface FeedbackTableProps {
  latestFeedback?: Feedback | null;
}

export default function FeedbackTable({ latestFeedback }: FeedbackTableProps) {
  const [submittedFeedback, setSubmittedFeedback] = useState<Feedback[]>([]);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [newFeedbackText, setNewFeedbackText] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { data, error } = await getAllFeedback();
        if (error) {
          console.error('Error fetching feedback:', error);
        } else {
          setSubmittedFeedback(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchFeedback();
  }, []);

  useEffect(() => {
    if (latestFeedback) {
      setSubmittedFeedback((prevFeedback) => [latestFeedback, ...prevFeedback]);
    }
  }, [latestFeedback]);

  const handleEdit = (feedback: Feedback) => {
    setEditingFeedback(feedback);
    setNewFeedbackText(feedback.feedback);
  };

  const handleSaveEdit = async () => {
    if (editingFeedback) {
      try {
        const { error } = await updateFeedback(editingFeedback.id, {
          name: editingFeedback.name,
          feedback: newFeedbackText,
        });
        if (error) {
          console.error('Error updating feedback:', error);
        } else {
          setSubmittedFeedback(
            submittedFeedback.map((entry) =>
              entry.id === editingFeedback.id ? { ...entry, feedback: newFeedbackText } : entry
            )
          );
          setEditingFeedback(null);
          setNewFeedbackText('');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingFeedback(null);
    setNewFeedbackText('');
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      const { error } = await deleteFeedback(id);
      if (error) {
        console.error('Error deleting feedback:', error);
      } else {
        setSubmittedFeedback(submittedFeedback.filter((entry) => entry.id !== id));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const headers = [
    { label: 'Name' },
    { label: 'Feedback' },
    { label: 'Actions' },
  ];

  const rows = submittedFeedback.map((entry) => ({
    cols: [
      entry.name,
      editingFeedback && editingFeedback.id === entry.id ? (
        <Input
          type="text"
          value={newFeedbackText}
          onChange={(e) => setNewFeedbackText(e.target.value)}
          placeholder="Edit your feedback"
        />
      ) : (
        entry.feedback
      ),
      editingFeedback && editingFeedback.id === entry.id ? (
        <>
          <Button
            text="Save"
            color="green"
            onClick={handleSaveEdit}
            className="mr-2"
          />
          <Button
            text="Cancel"
            color="red"
            onClick={handleCancelEdit}
          />
        </>
      ) : (
        <>
          <Button
            text="Edit"
            color="blue"
            onClick={() => handleEdit(entry)}
            className="mr-2"
          />
          <Button
            text="Delete"
            color="red"
            onClick={() => handleDelete(entry.id)}
          />
        </>
      ),
    ],
  }));

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6">Submitted Feedback</h2>
      {submittedFeedback.length > 0 ? (
        <Table headers={headers} rows={rows} />
      ) : (
        <div className="text-center p-4">No feedback submitted yet.</div>
      )}
    </div>
  );
}