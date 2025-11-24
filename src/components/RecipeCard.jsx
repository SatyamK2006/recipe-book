import React from "react";
import { Link } from "react-router-dom";
import { Clock, ChefHat, Flame, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const RecipeCard = ({ recipe }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-slate-900">
            {recipe.category}
          </span>
        </div>

        <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
          <ArrowUpRight size={20} />
        </button>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
          {recipe.time && (
            <>
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-secondary-500" />
                {recipe.time}
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
            </>
          )}
          {recipe.difficulty && (
            <>
              <div className="flex items-center gap-1.5">
                <ChefHat size={16} className="text-secondary-500" />
                {recipe.difficulty}
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
            </>
          )}
          {recipe.calories && (
            <div className="flex items-center gap-1.5">
              <Flame size={16} className="text-secondary-500" />
              {recipe.calories}
            </div>
          )}
        </div>

        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors leading-tight">
          {recipe.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {recipe.description || "A delicious recipe from TheMealDB."}
        </p>

        <Link
          to={recipe.isApi ? `/meal/${recipe.id}` : `/recipe/${recipe.id}`}
          className="inline-flex items-center text-sm font-bold text-slate-900 border-b-2 border-secondary-200 hover:border-secondary-500 transition-colors pb-1"
        >
          View Full Recipe
        </Link>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
