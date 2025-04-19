import { GoogleGenerativeAI } from '@google/generative-ai';
import { Ingredient, MealSuggestion } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const generatePrompt = (ingredients: Ingredient[], mealType: string, preferences: string[]) => {
  const ingredientsList = ingredients.map(i => i.name).join(', ');
  const dietaryRestrictions = preferences.length > 0 
    ? `Consider these dietary preferences: ${preferences.join(', ')}.` 
    : '';

  return `As a friendly college cooking expert, create a meal suggestion using these ingredients: ${ingredientsList}. 
  This is for ${mealType}. ${dietaryRestrictions}

  Format your response using these XML-style tags with HTML content inside:

  <meal>
    <instructions>
      <div class="meal-suggestion">
        <h1 class="text-3xl font-bold mb-6">Quick and Easy Meal Idea! 🍳</h1>
        
        <p class="text-lg mb-6">Here's what you can make with what you've got:</p>
        
        <h2 class="text-2xl font-semibold mb-4">Ingredients Needed:</h2>
        <ul class="list-disc pl-6 mb-6">
          <li>List ingredients here</li>
          <li>One per line</li>
        </ul>
        
        <h2 class="text-2xl font-semibold mb-4">Steps:</h2>
        <ol class="list-decimal pl-6 space-y-3">
          <li>First step of the cooking process</li>
          <li>Second step</li>
          <li>Third step</li>
        </ol>
      </div>
    </instructions>
    
    <quickTips>
      <div class="quick-tips bg-purple-50 p-6 rounded-lg mt-8">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Quick Tips</h3>
        <ul class="space-y-3">
          <li class="flex items-start">
            <span class="text-[#4F2683] mr-2">•</span>
            <span>First quick tip</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#4F2683] mr-2">•</span>
            <span>Second quick tip</span>
          </li>
          <li class="flex items-start">
            <span class="text-[#4F2683] mr-2">•</span>
            <span>Third quick tip</span>
          </li>
        </ul>
      </div>
    </quickTips>
    
    <healthyTip>
      <div class="healthy-tip">
        <p class="font-semibold mb-2">Healthy Tip:</p>
        <p>Your tip here</p>
      </div>
    </healthyTip>
    
    <leftoverIdea>
      <div class="leftover-idea">
        <p class="font-semibold mb-2">Leftover Idea:</p>
        <p>Your creative suggestion here</p>
      </div>
    </leftoverIdea>
  </meal>

  Include 3 relevant quick tips specific to the meal being prepared. Keep the tone casual and friendly, and make sure to use proper HTML formatting with the provided Tailwind classes!`;
};

const parseGeminiResponse = (response: string): MealSuggestion => {
  const getTagContent = (tag: string) => {
    const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 's');
    const match = response.match(regex);
    return match ? match[1].trim() : '';
  };

  const instructions = getTagContent('instructions');
  const quickTips = getTagContent('quickTips');
  const healthyTip = getTagContent('healthyTip');
  const leftoverIdea = getTagContent('leftoverIdea');

  return {
    id: Math.random().toString(36).substr(2, 9),
    title: 'Quick Meal Idea',
    ingredients: [],
    instructions,
    quickTips,
    prepTime: '15-20 minutes',
    mealType: 'quick meal',
    healthyTip,
    leftoverIdea
  };
};

export const generateMealSuggestions = async (
  ingredients: Ingredient[],
  mealType: string,
  preferences: string[]
): Promise<MealSuggestion[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = generatePrompt(ingredients, mealType, preferences);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return [parseGeminiResponse(text)];
  } catch (error) {
    console.error('Error generating meal suggestions:', error);
    return [{
      id: 'error',
      title: 'Oops! Something went wrong',
      ingredients: [],
      instructions: '<div class="text-red-600">Sorry, we had trouble generating a meal suggestion. Please try again!</div>',
      prepTime: 'N/A',
      mealType: 'error',
      quickTips: '',
      healthyTip: '',
      leftoverIdea: ''
    }];
  }
};

export const canGenerateMeal = (ingredients: Ingredient[], mealType: string): boolean => {
  return ingredients.length > 0 && mealType !== '';
};