// apiService.ts

import { Survey, SurveyCreationData, SurveyResponseData, SubmitResponseResult } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const apiRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API request failed');
  }
  return response.json();
};

export const fetchSurveys = async (
  filter?: 'created' | 'answered'
): Promise<Survey[]> => {
  const params = new URLSearchParams();
  if (filter) {
    params.append('filter', filter);
  }
  return apiRequest<Survey[]>(`/api/surveys?${params.toString()}`);
};

export const fetchSurveyById = async (surveyId: string): Promise<Survey> => {
  return apiRequest<Survey>(`/api/surveys/${surveyId}`);
};

export const createSurvey = async (
  surveyData: SurveyCreationData
): Promise<Survey> => {
  return apiRequest<Survey>('/api/surveys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include authorization header if needed
    },
    body: JSON.stringify(surveyData),
  });
};

export const submitSurveyResponse = async (
  surveyId: string,
  responses: SurveyResponseData
): Promise<SubmitResponseResult> => {
  return apiRequest<SubmitResponseResult>(`/api/surveys/${surveyId}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include authorization header if needed
    },
    body: JSON.stringify(responses),
  });
};
