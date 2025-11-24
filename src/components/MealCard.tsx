import React from 'react';
import { Meal } from '../services/mealdb';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ChefHat } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { getMealById } from '../services/mealdb';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    // Prefetch data on hover
    queryClient.prefetchQuery({
      queryKey: ['meal', meal.idMeal],
      queryFn: () => getMealById(meal.idMeal),
      staleTime: 1000 * 60 * 10,
    });
  };

  return (
    <Link to={`/meal/${meal.idMeal}`}>
      <motion.div
        whileHover={{ y: -8 }}
        onMouseEnter={handleMouseEnter}
        className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col group"
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full uppercase tracking-wider">
              {meal.strCategory}
            </span>
            {meal.strArea && (
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                {meal.strArea}
              </span>
            )}
          </div>

          <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {meal.strMeal}
          </h3>

          <div className="mt-auto flex items-center gap-4 text-slate-400 text-sm pt-4 border-t border-slate-50">
             {/* Placeholders since API doesn't always give time/difficulty */}
             <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>30m</span>
             </div>
             <div className="flex items-center gap-1">
                <ChefHat size={16} />
                <span>Medium</span>
             </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MealCard;
