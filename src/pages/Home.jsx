import React, { useState } from "react";
import Hero from "../components/Hero";
import MealCard from "../components/MealCard";
import {
  useCategories,
  useMealsByCategory,
  useTrendingMeals,
} from "../api/mealHooks";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Trending");
  const { data: categories } = useCategories();

  // Conditionally fetch based on activeCategory
  // Note: Hooks must be called unconditionally. We'll fetch both but only use one.
  // Ideally we'd use a single query with a dynamic key/fn, but this is simpler for now.
  const { data: categoryMeals, isLoading: isLoadingCategory } =
    useMealsByCategory(activeCategory !== "Trending" ? activeCategory : "");
  const { data: trendingMeals, isLoading: isLoadingTrending } =
    useTrendingMeals();

  const meals = activeCategory === "Trending" ? trendingMeals : categoryMeals;
  const isLoading =
    activeCategory === "Trending" ? isLoadingTrending : isLoadingCategory;

  // Limit to 6 items for display
  const displayMeals = meals?.slice(0, 6);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFAF9] pb-20">
        <Hero />

        {/* Categories Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">
                Browse by Category
              </h2>
              <p className="text-slate-500">
                Find the perfect meal for any time of day
              </p>
            </div>
          </div>

          <div className="mb-12 overflow-x-auto pb-4 no-scrollbar">
            <div className="flex gap-3 w-max">
              {/* Trending Button */}
              <button
                onClick={() => setActiveCategory("Trending")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeCategory === "Trending"
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                <Sparkles size={16} /> Trending
              </button>

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
        </section>

        {/* Recipes Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-2 block">
                  Editor's Pick
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                  {activeCategory === "Trending"
                    ? "Trending Recipes"
                    : `${activeCategory} Recipes`}
                </h2>
              </div>
              <Link
                to="/search"
                className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-primary-600 transition-colors"
              >
                View All Recipes <ArrowRight size={20} />
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary-600" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayMeals?.map((meal, index) => (
                  <motion.div
                    key={meal.idMeal}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MealCard meal={meal} />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-12 text-center md:hidden">
              <Link
                to="/search"
                className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-primary-600 transition-colors"
              >
                View All Recipes <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                Deliciousness to your inbox
              </h2>
              <p className="text-slate-400 mb-10 text-lg">
                Join 50,000+ home cooks and get our weekly recipe digest,
                cooking tips, and exclusive offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 backdrop-blur-sm"
                />
                <button className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-500 transition-colors shadow-lg shadow-primary-600/30">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
