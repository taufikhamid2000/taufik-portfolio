/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from 'react';
import { Button, Input, TextArea, Dropdown } from '../../../../../components/CommonComponents';
import { fetchRoles } from '../../Admin/roles/utils/rolesService';
import { SingleValue } from 'react-select';

interface ApplicationFormProps {
  onSubmit: () => void;
}

interface RoleOption {
  value: string;
  label: string;
}

export default function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<SingleValue<RoleOption>>(null);
  const [motivation, setMotivation] = useState('');
  const [rolesOptions, setRolesOptions] = useState<RoleOption[]>([]);

  useEffect(() => {
    const loadRoles = async () => {
      const fetchedRoles = await fetchRoles();
      const options = fetchedRoles.map((role: { title: string }) => ({
        value: role.title,
        label: role.title,
      }));
      setRolesOptions(options);
    };
    loadRoles();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Trigger the onSubmit callback to indicate successful form submission
    onSubmit();
    // Clear form fields
    setName('');
    setEmail('');
    setRole(null);
    setMotivation('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="mb-4">
        <label className="block text-lg mb-2">Name:</label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Email:</label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Role Interested In:</label>
        <Dropdown<RoleOption>
          id="role"
          value={role}
          onChange={(
            selectedOption: SingleValue<RoleOption>,
            // actionMeta: ActionMeta<RoleOption>
          ) => setRole(selectedOption)}
          options={rolesOptions}
          placeholder="Select the role you're interested in"
          isSearchable
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Why do you want to join?</label>
        <TextArea
          id="motivation"
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          required
          placeholder="Tell us why you want to join the team"
        />
      </div>
      <Button text="Submit Application" type="submit" color="blue" />
    </form>
  );
}