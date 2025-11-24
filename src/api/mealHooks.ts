import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  searchMealsByName,
  getMealById,
  listCategories,
  filterByCategory,
  getRandomMeal,
  getTrendingMeals,
  Meal,
  Category,
} from "../services/mealdb";

export const useSearchMeals = (query: string) => {
  return useQuery({
    queryKey: ["meals", "search", query],
    queryFn: () => searchMealsByName(query),
    enabled: !!query && query.length > 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useMealById = (id: string) => {
  return useQuery({
    queryKey: ["meal", id],
    queryFn: () => getMealById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: listCategories,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useMealsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["meals", "category", category],
    queryFn: () => filterByCategory(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useRandomMeal = () => {
  return useQuery({
    queryKey: ["meal", "random"],
    queryFn: getRandomMeal,
    staleTime: 0, // Always fetch new
    refetchOnWindowFocus: false,
  });
};

export const useTrendingMeals = () => {
  return useQuery({
    queryKey: ["meals", "trending"],
    queryFn: getTrendingMeals,
    staleTime: 1000 * 60 * 60, // 1 hour (keep trending stable for a while)
  });
};
