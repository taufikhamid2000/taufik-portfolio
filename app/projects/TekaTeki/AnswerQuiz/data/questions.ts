// app/projects/TekaTeki/data/questions.ts

export interface Option {
    text: string;
    isCorrect: boolean;
  }
  
  export interface QuestionType {
    questionText: string;
    options: Option[];
  }
  
  export const questions: QuestionType[] = [
    {
      questionText: 'What is 2 + 2?',
      options: [
        { text: '1', isCorrect: false },
        { text: '2', isCorrect: false },
        { text: '3', isCorrect: false },
        { text: '4', isCorrect: true },
      ],
    },
    {
      questionText: 'What is the capital of Malaysia?',
      options: [
        { text: 'Bangkok', isCorrect: false },
        { text: 'Jakarta', isCorrect: false },
        { text: 'Kuala Lumpur', isCorrect: true },
        { text: 'Hanoi', isCorrect: false },
      ],
    },
    // Add more questions as needed
  ];
  