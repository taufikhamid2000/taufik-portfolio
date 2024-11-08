// components/Question.tsx
interface QuestionProps {
    question: string;
    options: string[];
    onAnswer: (selectedOptionIndex: number) => void;
  }
  
  const Question = ({ question, options, onAnswer }: QuestionProps) => {
    return (
      <div className="mb-4">
        <p className="mb-2 font-medium">{question}</p>
        <ul>
          {options.map((option, index) => (
            <li key={index} className="text-center mb-2">
              <button
                className="bg-blue-400 text-white p-2 rounded w-auto hover:bg-blue-700"
                onClick={() => onAnswer(index)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Question;
  