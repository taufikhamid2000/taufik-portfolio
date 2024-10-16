import { useState } from 'react';

const LanguageSwitcher: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const switchLanguage = () => {
    // Implement language switch logic here, possibly using an open API or static translation files
    setCurrentLanguage((prev) => (prev === 'EN' ? 'MY' : 'EN'));
  };

  return (
    <button
      onClick={switchLanguage}
      className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
    >
      {currentLanguage}
    </button>
  );
};

export default LanguageSwitcher;