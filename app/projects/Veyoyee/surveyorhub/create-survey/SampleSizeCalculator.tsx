import { useState } from 'react';

interface SampleSizeCalculatorProps {
  onUseSampleSize: (size: number) => void;
}

export default function SampleSizeCalculator({ onUseSampleSize }: SampleSizeCalculatorProps) {
  const [populationSize, setPopulationSize] = useState<number | string>('');
  const [confidenceLevel, setConfidenceLevel] = useState<number | string>('');
  const [marginOfError, setMarginOfError] = useState<number | string>('');
  const [sampleSize, setSampleSize] = useState<number | null>(null);

  const calculateSampleSize = () => {
    // Convert string values to numbers before calculation
    const population = parseFloat(String(populationSize));
    const confidence = parseFloat(String(confidenceLevel));
    const margin = parseFloat(String(marginOfError));

    if (!isNaN(population) && !isNaN(confidence) && !isNaN(margin)) {
      // Map confidence level to Z-score
      let z = 0;
      switch (confidence) {
        case 80:
          z = 1.28;
          break;
        case 85:
          z = 1.44;
          break;
        case 90:
          z = 1.645;
          break;
        case 95:
          z = 1.96;
          break;
        case 99:
          z = 2.576;
          break;
        default:
          z = 1.96; // Default to 95% confidence level if not specified
      }

      const p = 0.5; // Estimated proportion (maximum variability)
      const e = margin / 100; // Convert margin of error percentage to decimal

      // Calculate initial sample size
      const n0 = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(e, 2);

      // Adjust for finite population
      const n = n0 / (1 + ((n0 - 1) / population));

      const size = Math.ceil(n);
      setSampleSize(size);
    }
  };

  const handleUseSampleSize = () => {
    if (sampleSize !== null) {
      onUseSampleSize(sampleSize);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Sample Size Calculator</h2>
      <div className="mb-4">
        <label className="block mb-2">Population Size:</label>
        <input
          type="number"
          value={populationSize}
          onChange={(e) => setPopulationSize(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Confidence Level (%):</label>
        <input
          type="number"
          value={confidenceLevel}
          onChange={(e) => setConfidenceLevel(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Margin of Error (%):</label>
        <input
          type="number"
          value={marginOfError}
          onChange={(e) => setMarginOfError(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>
      <button onClick={calculateSampleSize} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Calculate Sample Size
      </button>
      {sampleSize !== null && (
        <div className="mt-4 text-lg">
          Estimated Sample Size: <strong>{sampleSize}</strong>
          <div className="mt-4">
            <button
              onClick={handleUseSampleSize}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Use this sample size as minimum number of respondent
            </button>
          </div>
        </div>
      )}
    </div>
  );
}