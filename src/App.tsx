import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import IngredientInput from './components/IngredientInput';
import MealTypeSelector from './components/MealTypeSelector';
import DietaryPreferences from './components/DietaryPreferences';
import GenerateMealButton from './components/GenerateMealButton';
import SuggestionView from './components/SuggestionView';
import { Ingredient, MealSuggestion } from './types';
import { generateMealSuggestions, canGenerateMeal } from './utils/mealUtils';

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [mealType, setMealType] = useState<string>('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [suggestion, setSuggestion] = useState<MealSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddIngredients = (newIngredients: Ingredient[]) => {
    setIngredients(newIngredients);
  };

  const handleSelectMealType = (type: string) => {
    setMealType(type);
  };

  const togglePreference = (id: string) => {
    setPreferences(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id) 
        : [...prev, id]
    );
  };

  const handleGenerateMeal = async () => {
    setIsLoading(true);
    try {
      const suggestions = await generateMealSuggestions(
        ingredients,
        mealType,
        preferences
      );
      setSuggestion(suggestions[0]);
    } catch (error) {
      console.error('Error generating meal suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSuggestion(null);
  };

  const canGenerate = canGenerateMeal(ingredients, mealType);

  if (suggestion || isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <SuggestionView 
          suggestion={suggestion}
          loading={isLoading}
          onBack={handleReset}
          onTryAgain={handleGenerateMeal}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">College Cooking Made Easy</h1>
            <p className="text-gray-600">Tell us what you have, and we'll help you make something delicious!</p>
          </section>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 gap-6">
              <IngredientInput onAddIngredients={handleAddIngredients} />
              <MealTypeSelector
                selectedMealType={mealType}
                onSelectMealType={handleSelectMealType}
              />
              <DietaryPreferences
                selectedPreferences={preferences}
                onTogglePreference={togglePreference}
              />
              <GenerateMealButton
                onGenerate={handleGenerateMeal}
                disabled={!canGenerate}
                loading={isLoading}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;