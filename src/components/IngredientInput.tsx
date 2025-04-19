import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Ingredient } from '../types';

interface IngredientInputProps {
  onAddIngredients: (ingredients: Ingredient[]) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onAddIngredients }) => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const commonPantryItems = [
    // Quick Meals
    'Ramen',
    'Mac & Cheese',
    'Chicken Nuggets',
    'Tater Tots',
    'Hot Dogs',
    'Frozen Pizza',
    'PB & J',
    'Instant Noodles',
    // Staples
    'Eggs',
    'Milk',
    'Butter',
    'Cheese',
    'Bread',
    'Rice',
    'Pasta',
    // Pantry Items
    'Canned Soup',
    'Canned Tuna',
    'Cereal',
    'Peanut Butter',
    // Frozen Items
    'Frozen Veggies',
    'Frozen Chicken',
    'Pizza Rolls'
  ];

  const handleAddIngredient = (ingredient: string = inputValue.trim()) => {
    if (ingredient) {
      const newIngredient = { name: ingredient };
      const isAlreadyAdded = ingredients.some(item => 
        item.name.toLowerCase() === ingredient.toLowerCase()
      );
      
      if (!isAlreadyAdded) {
        setIngredients([...ingredients, newIngredient]);
        onAddIngredients([...ingredients, newIngredient]);
      }
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
    onAddIngredients(updatedIngredients);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">What's in your kitchen?</h2>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {commonPantryItems.map((item) => (
            <button
              key={item}
              onClick={() => handleAddIngredient(item)}
              className="px-3 py-1 text-sm bg-purple-50 text-[#4F2683] rounded-full hover:bg-purple-100 transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type ingredient and press Enter..."
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4F2683]"
          />
          <button
            onClick={() => handleAddIngredient()}
            className="bg-[#4F2683] hover:bg-purple-800 text-white p-2 rounded transition-colors duration-200"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="bg-purple-100 text-[#4F2683] px-3 py-1 rounded-full flex items-center"
            >
              <span className="mr-1">{ingredient.name}</span>
              <button
                onClick={() => removeIngredient(index)}
                className="text-[#4F2683] hover:text-purple-900"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientInput