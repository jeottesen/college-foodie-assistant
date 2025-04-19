import React from 'react';
import MealSuggestion from './MealSuggestion';
import { MealSuggestion as MealSuggestionType } from '../types';

interface SuggestionsListProps {
  suggestions: MealSuggestionType[];
  loading: boolean;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions, loading }) => {
  if (loading) {
    return (
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
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No meal suggestions yet. Add your ingredients and select a meal type to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {suggestions.map((suggestion) => (
        <MealSuggestion key={suggestion.id} suggestion={suggestion} />
      ))}
    </div>
  );
};

export default SuggestionsList