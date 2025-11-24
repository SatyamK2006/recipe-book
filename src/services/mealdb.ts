import axios from "axios";

const API_KEY = import.meta.env.VITE_MEALDB_KEY ?? "1";
const BASE_URL =
  import.meta.env.VITE_MEALDB_BASE ?? "https://www.themealdb.com/api/json/v1";

const client = axios.create({
  baseURL: `${BASE_URL}/${API_KEY}`,
  timeout: 10000,
});

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strIngredient1?: string;
  strMeasure1?: string;
  [key: string]: string | null | undefined; // For other ingredients/measures
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const getCached = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};

const setCache = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const searchMealsByName = async (query: string): Promise<Meal[]> => {
  if (!query) return [];
  const cacheKey = `search_${query}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const response = await client.get(`/search.php?s=${query}`);
    const meals = response.data.meals || [];
    setCache(cacheKey, meals);
    return meals;
  } catch (error) {
    console.error("Error searching meals:", error);
    return [];
  }
};

export const getMealById = async (id: string): Promise<Meal | null> => {
  const cacheKey = `meal_${id}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const response = await client.get(`/lookup.php?i=${id}`);
    const meal = response.data.meals ? response.data.meals[0] : null;
    if (meal) setCache(cacheKey, meal);
    return meal;
  } catch (error) {
    console.error(`Error fetching meal ${id}:`, error);
    return null;
  }
};

export const listCategories = async (): Promise<Category[]> => {
  const cacheKey = "categories";
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const response = await client.get("/categories.php");
    const categories = response.data.categories || [];
    setCache(cacheKey, categories);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const filterByCategory = async (category: string): Promise<Meal[]> => {
  const cacheKey = `category_${category}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const response = await client.get(`/filter.php?c=${category}`);
    const meals = response.data.meals || [];
    setCache(cacheKey, meals);
    return meals;
  } catch (error) {
    console.error(`Error filtering by category ${category}:`, error);
    return [];
  }
};

export const getRandomMeal = async (): Promise<Meal | null> => {
  // No cache for random
  try {
    const response = await client.get("/random.php");
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching random meal:", error);
    return null;
  }
};

export const getTrendingMeals = async (): Promise<Meal[]> => {
  const cacheKey = "trending_meals";
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    // Fetch 6 random meals in parallel
    const promises = Array(6)
      .fill(null)
      .map(() => getRandomMeal());
    const results = await Promise.all(promises);

    // Filter out nulls and potential duplicates
    const meals = results.filter((m): m is Meal => m !== null);
    const uniqueMeals = Array.from(
      new Map(meals.map((m) => [m.idMeal, m])).values()
    );

    // Filter out Beef and Pork just in case
    const filtered = uniqueMeals.filter(
      (m) => !["Beef", "Pork"].includes(m.strCategory)
    );

    setCache(cacheKey, filtered);
    return filtered;
  } catch (error) {
    console.error("Error fetching trending meals:", error);
    return [];
  }
};
