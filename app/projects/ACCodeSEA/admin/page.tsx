/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from 'react';
import Header from '../../../../components/Header';
import RolesTable from './roles/components/RolesTable';
import RoleForm from './roles/components/RoleForm';
import { fetchRoles, addRole, updateRole, deleteRole } from './roles/utils/rolesService';
import { Role } from './roles/types'; // Import the centralized Role interface
import '../../../../styles/commonStyles.css';
// import './styles/adminRolesStyles.css';

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const loadRoles = async () => {
      const fetchedRoles = await fetchRoles();
      setRoles(fetchedRoles);
    };
    loadRoles();
  }, []);

  const handleAddRole = async (newRole: Role) => {
    const addedRole = await addRole(newRole);
    if (addedRole) {
      setRoles((prevRoles) => [...prevRoles, addedRole]);
    }
    setIsFormVisible(false);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsFormVisible(true);
  };

  const handleUpdateRole = async (updatedRole: Role) => {
    const savedRole = await updateRole(updatedRole);
    if (savedRole) {
      setRoles((prevRoles) =>
        prevRoles.map((role) => (role.id === savedRole.id ? savedRole : role))
      );
    }
    setEditingRole(null);
    setIsFormVisible(false);
  };

  const handleDeleteRole = async (roleId: number) => {
    await deleteRole(roleId); // Assume deleteRole returns void
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin: Manage Roles</h1>

        {/* Roles Table */}
        <RolesTable
          roles={roles}
          onEdit={handleEditRole}
          onDelete={handleDeleteRole}
        />

        {/* Add/Edit Role Form */}
        {isFormVisible && (
          <RoleForm
            role={editingRole ?? undefined}
            onSave={editingRole ? handleUpdateRole : handleAddRole}
            onCancel={() => {
              setEditingRole(null);
              setIsFormVisible(false);
            }}
          />
        )}

        {/* Add New Role Button */}
        <div className="text-center mt-8">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => {
              setEditingRole(null);
              setIsFormVisible(true);
            }}
          >
            Add New Role
          </button>
        </div>
      </div>
    </div>
  );
}
