/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import { Button, Input, TextArea, Dropdown } from '../../../../../components/CommonComponents';
import '../../../../../styles/commonStyles.css';
import { ActionMeta, SingleValue } from 'react-select';

interface ContactFormProps {
  onSubmit: (formData: ContactFormData) => void;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubjectOption {
  value: string;
  label: string;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Trigger the onSubmit callback to handle form submission
    onSubmit(formData);
    // Clear form fields
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleSubjectChange = (
    selectedOption: SingleValue<SubjectOption>,
    actionMeta: ActionMeta<SubjectOption>
  ) => {
    if (selectedOption) {
      handleChange('subject', selectedOption.value);
    } else {
      handleChange('subject', '');
    }
  };

  const subjectOptions: SubjectOption[] = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Support' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Other' },
  ];

  const selectedSubjectOption = subjectOptions.find(
    (option) => option.value === formData.subject
  ) || null;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 border rounded-lg bg-white text-black">
      <div className="mb-4">
        <label className="block text-lg mb-2">Name:</label>
        <Input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
          required
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Email:</label>
        <Input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Subject:</label>
        <Dropdown<SubjectOption>
          id="subject"
          value={selectedSubjectOption}
          onChange={handleSubjectChange}
          options={subjectOptions}
          placeholder="Select a subject"
          isSearchable
          classNamePrefix="react-select"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Message:</label>
        <TextArea
          id="message"
          value={formData.message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('message', e.target.value)}
          required
          placeholder="Enter your message"
        />
      </div>
      <Button text="Submit" type="submit" color="blue" />
    </form>
  );
}