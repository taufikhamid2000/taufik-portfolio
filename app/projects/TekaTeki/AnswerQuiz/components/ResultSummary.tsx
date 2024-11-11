// app/projects/TekaTeki/components/ResultSummary.tsx

interface ResultSummaryProps {
    score: number;
    totalQuestions: number;
    onRestart: () => void;
  }
  
  const ResultSummary = ({ score, totalQuestions, onRestart }: ResultSummaryProps) => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
        <p className="mb-6">
          You scored <strong>{score}</strong> out of <strong>{totalQuestions}</strong>
        </p>
        <button
          onClick={onRestart}
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  };
  
  export default ResultSummary;
  