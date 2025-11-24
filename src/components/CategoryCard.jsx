import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/recipes?category=${category.name}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="relative h-40 rounded-3xl overflow-hidden cursor-pointer group"
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="text-xl font-serif font-bold mb-1">{category.name}</h3>
          <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            {category.count} Recipes
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
