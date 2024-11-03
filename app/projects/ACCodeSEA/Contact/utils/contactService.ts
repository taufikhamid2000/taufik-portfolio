/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '../../../../../lib/supabaseClient';

// Function to submit contact form data to Supabase
type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export const submitContactForm = async (
  formData: ContactFormData
): Promise<ContactFormResponse> => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([formData]);

  if (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }

  return { success: true, data };
};