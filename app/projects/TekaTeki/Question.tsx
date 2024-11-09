// components/Question.tsx

interface Option {
  text: string;
  isCorrect: boolean;
}

interface QuestionProps {
  question: string;
  options: Option[];
  onAnswer: (selectedOptionIndex: number) => void;
  isFeedbackVisible: boolean;
  userAnswer: number | null;
  isAnswered: boolean;
}

const Question = ({
  question,
  options,
  onAnswer,
  isFeedbackVisible,
  userAnswer,
  isAnswered,
}: QuestionProps) => {
  return (
    <div className="mb-4">
      <p className="mb-2 font-medium">{question}</p>
      <ul>
        {options.map((option, index) => {
          let optionClass = 'bg-blue-400 text-white p-2 rounded w-auto hover:bg-blue-700';

          if (isFeedbackVisible || isAnswered) {
            if (option.isCorrect) {
              optionClass = 'bg-green-500 text-white p-2 rounded w-auto';
            } else if (index === userAnswer) {
              optionClass = 'bg-red-500 text-white p-2 rounded w-auto';
            } else {
              optionClass = 'bg-gray-300 text-black p-2 rounded w-auto';
            }
          }

          return (
            <li key={index} className="text-center mb-2">
              <button
                className={optionClass}
                onClick={() => !isAnswered && onAnswer(index)}
                disabled={isAnswered}
              >
                {option.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Question;
