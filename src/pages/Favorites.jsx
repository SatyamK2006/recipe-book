import React from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import PageTransition from "../components/PageTransition";

const Favorites = () => {
  const { favorites, recipes } = useRecipes();

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFAF9] pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Your Favorites
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto">
              A collection of your most loved recipes. Cook them again and
              again.
            </p>
          </div>

          {favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favoriteRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
                No favorites yet
              </h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                Start exploring recipes and click the heart icon to save them
                here for later.
              </p>
              <Link
                to="/recipes"
                className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-primary-600 transition-colors"
              >
                Explore Recipes
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Favorites;
