import React from 'react';
import { Leaf, Recycle } from 'lucide-react';
import { MealSuggestion as MealSuggestionType } from '../types';
import parse from 'html-react-parser';

interface MealSuggestionProps {
  suggestion: MealSuggestionType;
}

const MealSuggestion: React.FC<MealSuggestionProps> = ({ suggestion }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-lg">
      <div className="text-gray-800">
        {parse(suggestion.instructions)}
      </div>

      {suggestion.healthyTip && (
        <div className="bg-purple-50 p-4 rounded-md mb-4 mt-6">
          <div className="flex items-start">
            <Leaf size={20} className="text-[#4F2683] mr-3 mt-1 flex-shrink-0" />
            <div className="text-gray-800">
              {parse(suggestion.healthyTip)}
            </div>
          </div>
        </div>
      )}

      {suggestion.leftoverIdea && (
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex items-start">
            <Recycle size={20} className="text-[#4F2683] mr-3 mt-1 flex-shrink-0" />
            <div className="text-gray-800">
              {parse(suggestion.leftoverIdea)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSuggestion;