'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table from '@/components/Table';
import { fetchHierarchyData } from './utils/hierarchyService';
import '../../../styles/commonStyles.css';

// Define interfaces for Level, Subject, Chapter, and Lesson
interface Level {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
  level_id: string;
}

interface Chapter {
  id: string;
  name: string;
  subject_id: string;
}

interface Lesson {
  id: string;
  name: string;
  chapter_id: string;
}

const HomePage: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentLevel, setCurrentLevel] = useState<string | null>(null);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [currentChapter, setCurrentChapter] = useState<string | null>(null);

  // Fetch levels on component mount
  useEffect(() => {
    const fetchLevels = async () => {
      setLoading(true);
      try {
        const levelsData = await fetchHierarchyData('levels');
        setLevels(levelsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLevels();
  }, []);

  // Fetch subjects for a specific level
  const fetchSubjects = async (levelId: string) => {
    setLoading(true);
    setError('');
    try {
      const subjectsData = await fetchHierarchyData('subjects', undefined, levelId);
      setSubjects(subjectsData);
      setCurrentLevel(levelId);
      setCurrentSubject(null);
      setCurrentChapter(null);
      setLessons([]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch chapters for a specific subject
  const fetchChapters = async (subjectId: string) => {
    setLoading(true);
    setError('');
    try {
      const chaptersData = await fetchHierarchyData('chapters', subjectId);
      setChapters(chaptersData);
      setCurrentSubject(subjectId);
      setCurrentChapter(null);
      setLessons([]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch lessons for a specific chapter
  const fetchLessons = async (chapterId: string) => {
    setLoading(true);
    setError('');
    try {
      const lessonsData = await fetchHierarchyData('lessons', chapterId);
      setLessons(lessonsData);
      setCurrentChapter(chapterId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom-bg-color">
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Hierarchy Viewer</h1>

        {/* Conditional rendering based on state */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : currentLevel ? (
          currentSubject ? (
            currentChapter ? (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-center">Lessons</h2>
                <Table
                  data={lessons}
                  columns={[{ key: 'name', label: 'Lesson Name' }]}
                  onRowClick={(lesson) => console.log('Lesson clicked:', lesson)}
                />
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setCurrentChapter(null)}
                >
                  Back to Chapters
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-center">Chapters</h2>
                <Table
                  data={chapters}
                  columns={[{ key: 'name', label: 'Chapter Name' }]}
                  onRowClick={(chapter) => fetchLessons(chapter.id)}
                />
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setCurrentSubject(null)}
                >
                  Back to Subjects
                </button>
              </div>
            )
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center">Subjects</h2>
              <Table
                data={subjects}
                columns={[{ key: 'name', label: 'Subject Name' }]}
                onRowClick={(subject) => fetchChapters(subject.id)}
              />
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setCurrentLevel(null)}
              >
                Back to Levels
              </button>
            </div>
          )
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Levels</h2>
            <Table
              data={levels}
              columns={[{ key: 'name', label: 'Level Name' }]}
              onRowClick={(level) => fetchSubjects(level.id)}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
