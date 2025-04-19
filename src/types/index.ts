export interface Ingredient {
  name: string;
}

export interface MealType {
  id: string;
  label: string;
  icon: string;
}

export interface DietaryPreference {
  id: string;
  label: string;
}

export interface MealSuggestion {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  prepTime: string;
  mealType: string;
  healthyTip?: string;
  leftoverIdea?: string;
}