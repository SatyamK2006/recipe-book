import React, { useState, useEffect } from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import { RecipeCardSkeleton } from "../components/ui/Skeleton";
import { motion } from "framer-motion";
import { Filter, ChevronDown } from "lucide-react";
import { categories } from "../data/recipes";

import PageTransition from "../components/PageTransition";

import { useMealsByCategory } from "../api/mealHooks";

const Recipes = () => {
  const { filteredRecipes, selectedCategory, setSelectedCategory } =
    useRecipes();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch API meals for different categories to populate the list
  // Fetch API meals for different categories to populate the list
  // Optimization: Only fetch one category initially, others can be lazy or we just fetch a broader "Chicken" and "Vegetarian" set for now
  // to reduce the 5x network waterfall.
  const { data: chickenMeals } = useMealsByCategory("Chicken");
  const { data: vegetarianMeals } = useMealsByCategory("Vegetarian");
  // Removed Dessert, Breakfast, Pasta for initial load speed.
  // If user wants those, they can use the search bar or we can add them back with better caching/prefetching later.
  const dessertMeals = [];
  const breakfastMeals = [];
  const pastaMeals = [];

  // Combine and normalize API meals
  const apiRecipes = React.useMemo(() => {
    const allApiMeals = [
      ...(chickenMeals || []),
      ...(vegetarianMeals || []),
      ...(dessertMeals || []),
      ...(breakfastMeals || []),
      ...(pastaMeals || []),
    ];

    // Remove duplicates
    const uniqueMeals = Array.from(
      new Map(allApiMeals.map((m) => [m.idMeal, m])).values()
    );

    return uniqueMeals
      .filter((meal) => !["Beef", "Pork"].includes(meal.strCategory)) // Filter out Beef/Pork
      .map((meal) => {
        // Map API categories to our filter categories for logic AND display
        const filterCategory =
          meal.strCategory === "Breakfast"
            ? "Breakfast"
            : meal.strCategory === "Dessert"
            ? "Dessert"
            : ["Vegetarian", "Starter", "Side"].includes(meal.strCategory)
            ? "Lunch"
            : "Dinner"; // Default everything else to Dinner

        // Generate consistent pseudo-random values based on ID
        const seed = parseInt(meal.idMeal) || 0;
        const time = `${(seed % 45) + 15} min`;
        const difficulty = ["Easy", "Medium", "Hard"][seed % 3];
        const calories = `${(seed % 400) + 250} kcal`;

        return {
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          category: filterCategory, // Use the mapped category for display
          description: `A delicious ${meal.strArea} ${meal.strCategory} dish.`,
          isApi: true,
          filterCategory: filterCategory,
          time,
          difficulty,
          calories,
        };
      });
  }, [chickenMeals, vegetarianMeals, dessertMeals, breakfastMeals, pastaMeals]);

  const [searchQuery, setSearchQuery] = useState("");

  // Merge and filter
  const displayRecipes = React.useMemo(() => {
    // Filter API recipes based on selectedCategory
    const filteredApi =
      selectedCategory === "all"
        ? apiRecipes
        : apiRecipes.filter((r) => r.filterCategory === selectedCategory);

    // Combine mock filtered recipes + API filtered recipes
    // Note: filteredRecipes from context is already filtered by selectedCategory

    // Filter mock recipes again to be safe and exclude Beef/Pork
    const safeMockRecipes = filteredRecipes.filter((recipe) => {
      const isBeefOrPork =
        ["Beef", "Pork"].includes(recipe.category) ||
        recipe.title.toLowerCase().includes("beef") ||
        recipe.title.toLowerCase().includes("pork") ||
        recipe.tags.some((tag) => ["Beef", "Pork"].includes(tag));
      return !isBeefOrPork;
    });

    const combined = [...safeMockRecipes, ...filteredApi];

    // Filter by search query
    if (!searchQuery) return combined;

    const lowerQuery = searchQuery.toLowerCase();
    return combined.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowerQuery) ||
        (recipe.description &&
          recipe.description.toLowerCase().includes(lowerQuery))
    );
  }, [filteredRecipes, apiRecipes, selectedCategory, searchQuery]);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFAF9] pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header & Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">
                All Recipes
              </h1>
              <p className="text-slate-500 mb-6">
                Showing {displayRecipes.length} delicious recipes
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto no-scrollbar">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === "all"
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                All Recipes
              </button>
              {categories
                .filter((c) => c.id !== "all")
                .map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
            </div>
          </div>

          {/* Recipe Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <RecipeCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayRecipes.length > 0 ? (
                displayRecipes.map((recipe) => (
                  <motion.div key={recipe.id} variants={item}>
                    <RecipeCard recipe={recipe} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                    No recipes found
                  </h3>
                  <p className="text-slate-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Recipes;
