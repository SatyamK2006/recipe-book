import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRecipes } from "../../context/RecipeContext";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useRecipes();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, setSearchQuery]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-slate-400" size={20} />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search recipes, ingredients..."
          className="w-full pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
        <AnimatePresence>
          {localQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setLocalQuery("")}
              className="absolute right-3 p-1 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;
