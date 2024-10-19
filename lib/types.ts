// lib/types.ts

export type QuestionType = "shortAnswer" | "paragraph" | "multipleChoice";

export interface QuestionData {
  id: string; // Ensure id is a string
  questionText: string;
  type: QuestionType;
  options?: string[];
}

export interface Survey {
  id: string;
  title: string;
  description?: string;
  questions: QuestionData[];
  created_at?: string;
  answered_at?: string;
  // Add other properties if needed
}

export interface SurveyCreationData {
  title: string;
  description?: string;
  questions: QuestionData[];
  minRespondents?: number;
  maxRespondents?: number;
  startDate?: string;
  endDate?: string;
}

export interface SurveyResponseData {
  answers: {
    questionId: string;
    response: string;
  }[];
}

export interface SubmitResponseResult {
  message: string;
  // Add other properties if needed
}
