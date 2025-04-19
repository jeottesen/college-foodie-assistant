import React from 'react';
import { Coffee, Utensils, Moon, Apple } from 'lucide-react';
import { MealType } from '../types';

interface MealTypeSelectorProps {
  selectedMealType: string;
  onSelectMealType: (mealType: string) => void;
}

const MealTypeSelector: React.FC<MealTypeSelectorProps> = ({
  selectedMealType,
  onSelectMealType,
}) => {
  const mealTypes: MealType[] = [
    { id: 'breakfast', label: 'Breakfast', icon: 'Coffee' },
    { id: 'lunch', label: 'Lunch', icon: 'Utensils' },
    { id: 'dinner', label: 'Dinner', icon: 'Utensils' },
    { id: 'snack', label: 'Snack', icon: 'Apple' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee size={20} />;
      case 'Utensils':
        return <Utensils size={20} />;
      case 'Moon':
        return <Moon size={20} />;
      case 'Apple':
        return <Apple size={20} />;
      default:
        return <Utensils size={20} />;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">What are you making?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {mealTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelectMealType(type.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
              selectedMealType === type.id
                ? 'bg-[#4F2683] text-white'
                : 'bg-purple-50 text-[#4F2683] hover:bg-purple-100'
            }`}
          >
            {getIcon(type.icon)}
            <span className="mt-1">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MealTypeSelector