import { useState } from 'react';

const DescriptionWithToggle = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="max-w-full">
      {isExpanded ? (
        <p>
          {description}{' '}
          <button
            onClick={toggleExpanded}
            className="text-blue-500 hover:underline"
          >
            Show less
          </button>
        </p>
      ) : (
        <p>
          {description.slice(0, 200)}...{' '}
          <button
            onClick={toggleExpanded}
            className="text-blue-500 hover:underline"
          >
            Show more
          </button>
        </p>
      )}
    </div>
  );
};

export default DescriptionWithToggle;
