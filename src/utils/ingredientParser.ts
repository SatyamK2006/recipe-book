import { Meal } from '../services/mealdb';

export interface Ingredient {
  name: string;
  measure: string;
  image: string;
}

export const parseIngredients = (meal: Meal): Ingredient[] => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientName = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredientName && ingredientName.trim() !== '') {
      ingredients.push({
        name: ingredientName,
        measure: measure || '',
        image: `https://www.themealdb.com/images/ingredients/${ingredientName}.png`,
      });
    }
  }

  return ingredients;
};
