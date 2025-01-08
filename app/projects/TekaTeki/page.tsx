'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table from '@/components/Table';
import { fetchHierarchyData } from './utils/hierarchyService';
import HierarchyView from '@/components/HierarchyView';
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

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : currentLevel ? (
          currentSubject ? (
            currentChapter ? (
              <HierarchyView
                title="Lessons"
                data={lessons}
                columns={[{ key: 'name', label: 'Lesson Name' }]}
                onRowClick={(lesson) => console.log('Lesson clicked:', lesson)}
                onBack={() => setCurrentChapter(null)}
              />
            ) : (
              <HierarchyView
                title="Chapters"
                data={chapters}
                columns={[{ key: 'name', label: 'Chapter Name' }]}
                onRowClick={(chapter) => fetchLessons(chapter.id)}
                onBack={() => setCurrentSubject(null)}
              />
            )
          ) : (
            <HierarchyView
              title="Subjects"
              data={subjects}
              columns={[{ key: 'name', label: 'Subject Name' }]}
              onRowClick={(subject) => fetchChapters(subject.id)}
              onBack={() => setCurrentLevel(null)}
            />
          )
        ) : (
          <HierarchyView
            title="Levels"
            data={levels}
            columns={[{ key: 'name', label: 'Level Name' }]}
            onRowClick={(level) => fetchSubjects(level.id)}
          />
        )}
      </main>
    </div>
  );
};

export default HomePage;