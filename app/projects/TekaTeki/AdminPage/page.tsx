'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Table from '@/components/Table';
import { fetchHierarchyData } from '../utils/hierarchyService';
import '../../../../styles/commonStyles.css';

interface Entity {
  id: string;
  name: string;
}

const entityTypes = {
  levels: 'Levels',
  subjects: 'Subjects',
  chapters: 'Chapters',
  lessons: 'Lessons',
};

const AdminPage: React.FC = () => {
  const [currentType, setCurrentType] = useState<keyof typeof entityTypes>('levels');
  const [entities, setEntities] = useState<Entity[]>([]);
  const [childEntities, setChildEntities] = useState<Entity[]>([]);
  const [parentId, setParentId] = useState<string | null>(null);
  const [newEntityName, setNewEntityName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Fetch entities for the current type
  useEffect(() => {
    const fetchEntities = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchHierarchyData(currentType, parentId || undefined);
        setEntities(data);
        setChildEntities([]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEntities();
  }, [currentType, parentId]);

  // Handle navigation to child entities
  const handleRowClick = async (id: string) => {
    if (currentType === 'lessons') return; // No navigation for lessons
    const nextType = Object.keys(entityTypes)[Object.keys(entityTypes).indexOf(currentType) + 1];
    if (nextType) {
      setLoading(true);
      try {
        const data = await fetchHierarchyData(nextType as keyof typeof entityTypes, id);
        setChildEntities(data);
        setParentId(id);
        setCurrentType(nextType as keyof typeof entityTypes);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Add a new entity
  const addEntity = async () => {
    if (!newEntityName.trim()) return alert(`${entityTypes[currentType]} name cannot be empty.`);
    try {
      const response = await fetch(`/api/hierarchy/${currentType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newEntityName }),
      });
      if (!response.ok) throw new Error(`Failed to add ${entityTypes[currentType]}.`);

      const addedEntity: Entity = await response.json();
      setEntities((prev) => [...prev, addedEntity]);
      setNewEntityName('');
    } catch (err: any) {
      console.error(`Error adding ${entityTypes[currentType]}:`, err.message);
    }
  };

  // Edit an entity
  const editEntity = async (id: string, newName: string) => {
    if (!newName.trim()) return alert(`${entityTypes[currentType]} name cannot be empty.`);
    try {
      const response = await fetch(`/api/hierarchy/${currentType}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      if (!response.ok) throw new Error(`Failed to edit ${entityTypes[currentType]}.`);

      setEntities((prev) =>
        prev.map((entity) => (entity.id === id ? { ...entity, name: newName } : entity))
      );
    } catch (err: any) {
      console.error(`Error editing ${entityTypes[currentType]}:`, err.message);
    }
  };

  // Delete an entity
  const deleteEntity = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this ${entityTypes[currentType]}?`)) return;
    try {
      const response = await fetch(`/api/hierarchy/${currentType}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Failed to delete ${entityTypes[currentType]}.`);

      setEntities((prev) => prev.filter((entity) => entity.id !== id));
    } catch (err: any) {
      console.error(`Error deleting ${entityTypes[currentType]}:`, err.message);
    }
  };

  // Navigate back to parent entities
  const handleBack = () => {
    const prevType = Object.keys(entityTypes)[Object.keys(entityTypes).indexOf(currentType) - 1];
    if (prevType) {
      setCurrentType(prevType as keyof typeof entityTypes);
      setParentId(null);
    }
  };

  return (
    <div className="min-h-screen bg-custom-bg-color">
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Admin Page</h1>

        {/* Loading/Error State */}
        {loading ? (
          <p className="text-center">Loading {entityTypes[currentType]}...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Manage {entityTypes[currentType]}
            </h2>
            <Table
              data={entities}
              columns={[
                { key: 'name', label: `${entityTypes[currentType]} Name` },
                {
                  key: 'actions',
                  label: 'Actions',
                  render: (entity: Entity) => (
                    <div className="flex gap-2">
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                        onClick={() => {
                          const newName = prompt(
                            `Enter new ${entityTypes[currentType]} name:`,
                            entity.name
                          );
                          if (newName) editEntity(entity.id, newName);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                        onClick={() => deleteEntity(entity.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ),
                },
              ]}
              onRowClick={(entity) => handleRowClick(entity.id)}
            />
            <div className="mt-4 flex gap-2 justify-center">
              <input
                type="text"
                value={newEntityName}
                onChange={(e) => setNewEntityName(e.target.value)}
                placeholder={`Enter ${entityTypes[currentType]} name`}
                className="border rounded px-2 py-1"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={addEntity}
              >
                Add {entityTypes[currentType]}
              </button>
            </div>
            {parentId && (
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleBack}
              >
                Back
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
