// D:/taufik-portfolio/taufik-portfolio/app/projects/ACCodeSEA/admin/roles/components/RolesTable.tsx

import React from 'react';
import { Role } from '../../../shared/utils/types';

interface RolesTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (roleId: number) => void;
}

const RolesTable: React.FC<RolesTableProps> = ({ roles, onEdit, onDelete }) => {
  return (
    <div className="roles-table overflow-x-auto">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Skills</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.id}>
                <td className="px-4 py-2 border">{role.title}</td>
                <td className="px-4 py-2 border">{role.description}</td>
                <td className="px-4 py-2 border">
                  <ul className="list-disc pl-5">
                    {role.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => onEdit(role)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(role.id!)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No roles available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RolesTable;