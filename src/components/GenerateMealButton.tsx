import React from 'react';
import { CookingPot } from 'lucide-react';

interface GenerateMealButtonProps {
  onGenerate: () => void;
  disabled: boolean;
  loading: boolean;
}

const GenerateMealButton: React.FC<GenerateMealButtonProps> = ({
  onGenerate,
  disabled,
  loading,
}) => {
  return (
    <button
      onClick={onGenerate}
      disabled={disabled || loading}
      className={`w-full py-3 px-6 rounded-lg flex items-center justify-center font-medium transition-all duration-300 ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-[#4F2683] hover:bg-purple-800 text-white shadow-md hover:shadow-lg'
      }`}
    >
      {loading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Cooking up ideas...
        </div>
      ) : (
        <div className="flex items-center">
          <CookingPot size={20} className="mr-2" />
          Generate Meal Ideas
        </div>
      )}
    </button>
  );
};

export default GenerateMealButton