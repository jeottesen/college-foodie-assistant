import React from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { MealSuggestion } from '../types';
import MealSuggestionCard from './MealSuggestion';

interface SuggestionViewProps {
  suggestion: MealSuggestion | null;
  loading: boolean;
  onBack: () => void;
  onTryAgain: () => void;
}

const SuggestionView: React.FC<SuggestionViewProps> = ({
  suggestion,
  loading,
  onBack,
  onTryAgain
}) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-[#4F2683] hover:text-purple-800 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to ingredients
          </button>
          <button
            onClick={onTryAgain}
            className="flex items-center text-[#4F2683] hover:text-purple-800 transition-colors duration-200"
          >
            <RefreshCw size={20} className="mr-2" />
            Try another recipe
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-4 bg-purple-200 rounded w-3/4"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 bg-purple-200 rounded col-span-2"></div>
                    <div className="h-4 bg-purple-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-4 bg-purple-200 rounded"></div>
                </div>
              </div>
            </div>
            <p className="text-[#4F2683] mt-4 font-medium">Cooking up some ideas...</p>
          </div>
        ) : suggestion ? (
          <MealSuggestionCard suggestion={suggestion} />
        ) : null}
      </div>
    </main>
  );
};

export default SuggestionView;