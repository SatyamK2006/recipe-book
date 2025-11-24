import React, { useState, useRef, useEffect } from "react";
import { useSearchMeals } from "../api/mealHooks";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const MealSearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: meals, isLoading } = useSearchMeals(debouncedQuery);

  const filteredMeals = meals?.filter(
    (meal) => !["Beef", "Pork"].includes(meal.strCategory)
  );

  // Debounce the search query update
  const updateQuery = useRef(
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, 400)
  ).current;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    updateQuery(value);
    setIsOpen(true);
  };

  const handleSelectMeal = (id: string) => {
    navigate(`/meal/${id}`);
    setIsOpen(false);
    setInputValue("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg mx-auto z-50">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for a meal (e.g. Lasagna)..."
          className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-lg"
          aria-label="Search meals"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Search size={20} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && inputValue.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute w-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden max-h-[60vh] overflow-y-auto"
          >
            {filteredMeals && filteredMeals.length > 0 ? (
              <ul>
                {filteredMeals.map((meal) => (
                  <li key={meal.idMeal}>
                    <button
                      onClick={() => handleSelectMeal(meal.idMeal)}
                      className="w-full flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors text-left"
                    >
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900">
                          {meal.strMeal}
                        </h4>
                        <span className="text-xs text-slate-500">
                          {meal.strArea} • {meal.strCategory}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              !isLoading &&
              debouncedQuery && (
                <div className="p-6 text-center text-slate-500">
                  No meals found for "{debouncedQuery}"
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MealSearchBar;
