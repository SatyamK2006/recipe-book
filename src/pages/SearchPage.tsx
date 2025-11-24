import React, { useState } from "react";
import MealSearchBar from "../components/MealSearchBar";
import MealCard from "../components/MealCard";
import {
  useSearchMeals,
  useCategories,
  useMealsByCategory,
} from "../api/mealHooks";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const SearchPage = () => {
  const [activeCategory, setActiveCategory] = useState("Chicken"); // Default category
  const { data: categories } = useCategories();
  const {
    data: meals,
    isLoading,
    isError,
  } = useMealsByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-[#FAFAF9] pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Find Your Next Meal
          </h1>
          <MealSearchBar />
        </div>

        {/* Categories */}
        <div className="mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-3 w-max mx-auto">
            {categories
              ?.filter((cat) => !["Beef", "Pork"].includes(cat.strCategory))
              .map((cat) => (
                <button
                  key={cat.idCategory}
                  onClick={() => setActiveCategory(cat.strCategory)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    activeCategory === cat.strCategory
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {cat.strCategory}
                </button>
              ))}
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary-600" size={40} />
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-500">
            Something went wrong. Please try again.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {meals
              ?.filter((meal) => !["Beef", "Pork"].includes(meal.strCategory))
              .map((meal) => (
                <motion.div
                  key={meal.idMeal}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <MealCard meal={meal} />
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
