/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import { Button, Input, TextArea } from '../../../../../components/CommonComponents';

interface ApplicationFormProps {
  onSubmit: () => void;
}

export default function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [motivation, setMotivation] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Trigger the onSubmit callback to indicate successful form submission
    onSubmit();
    // Clear form fields
    setName('');
    setEmail('');
    setRole('');
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Role Interested In:</label>
        <Input
          type="text"
          id="role"
          value={role}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
          required
          placeholder="Enter the role you're interested in"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Why do you want to join?</label>
        <TextArea
          id="motivation"
          value={motivation}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMotivation(e.target.value)}
          required
          placeholder="Tell us why you want to join the team"
        />
      </div>
      <Button text="Submit Application" type="submit" color="blue" />
    </form>
  );
}