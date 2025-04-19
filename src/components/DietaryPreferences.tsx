import React from 'react';
import { DietaryPreference } from '../types';

interface DietaryPreferencesProps {
  selectedPreferences: string[];
  onTogglePreference: (id: string) => void;
}

const DietaryPreferences: React.FC<DietaryPreferencesProps> = ({
  selectedPreferences,
  onTogglePreference,
}) => {
  const preferences: DietaryPreference[] = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'glutenFree', label: 'Gluten-Free' },
    { id: 'dairyFree', label: 'Dairy-Free' },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Dietary Preferences</h2>
      <div className="flex flex-wrap gap-2">
        {preferences.map((pref) => (
          <button
            key={pref.id}
            onClick={() => onTogglePreference(pref.id)}
            className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
              selectedPreferences.includes(pref.id)
                ? 'bg-[#4F2683] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {pref.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DietaryPreferences