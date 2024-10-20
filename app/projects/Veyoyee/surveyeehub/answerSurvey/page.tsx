/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import Header from "../../../../../components/Header";
import { Button, Input } from "../../../../../components/CommonComponents";
import { useRouter } from "next/navigation";
import { fetchSurveyById, submitSurveyResponse } from "../../../../../lib/apiService";
import { useSearchParams } from "next/navigation";
import { QuestionData, SurveyResponseData } from "../../../../../lib/types";

function SurveyForm() {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const surveyId = searchParams.get("id");

  useEffect(() => {
    const fetchSurveyData = async () => {
      if (surveyId) {
        try {
          const fetchedSurvey = await fetchSurveyById(surveyId);
          setSurveyTitle(fetchedSurvey.title);
          setQuestions(fetchedSurvey.questions);
        } catch (error) {
          console.error("Error fetching survey data:", error);
        }
      }
    };

    fetchSurveyData();
  }, [surveyId]);

  const handleInputChange = (id: string, value: string) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!surveyId) {
      console.error("Survey ID is missing");
      return;
    }

    const surveyResponse: SurveyResponseData = {
      answers: Object.keys(responses).map((questionId) => ({
        questionId,
        response: responses[questionId],
      })),
    };

    try {
      await submitSurveyResponse(surveyId, surveyResponse);
      console.log("Survey Responses Submitted:", surveyResponse);
      router.push("/projects/Veyoyee/surveyeehub");
    } catch (error) {
      console.error("Error submitting survey responses:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header title={surveyTitle} />
      <div className="pt-20 w-full max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">{surveyTitle}</h1>
        <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          {questions.map((question) => (
            <div key={question.id} className="mb-6">
              <label className="block text-lg font-medium mb-2">{question.questionText}</label>
              {question.type === "shortAnswer" && (
                <Input
                  type="text"
                  value={responses[question.id] || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(question.id, e.target.value)
                  }
                  required
                />
              )}
              {question.type === "paragraph" && (
                <textarea
                  value={responses[question.id] || ""}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleInputChange(question.id, e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                  rows={4}
                  required
                ></textarea>
              )}
              {question.type === "multipleChoice" && (
                <select
                  value={responses[question.id] || ""}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange(question.id, e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                  required
                >
                  <option value="">Select an option</option>
                  {question.options?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
          <Button text="Submit Survey" color="green" type="submit" className="w-full mt-6" />
        </form>
      </div>
    </div>
  );
}

function AnswerSurveyContent() {
  return <SurveyForm />;
}

export default function AnswerSurveyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnswerSurveyContent />
    </Suspense>
  );
}
