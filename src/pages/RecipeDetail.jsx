import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import {
  Clock,
  ChefHat,
  Flame,
  ArrowLeft,
  CheckCircle,
  Heart,
  Share2,
  Printer,
} from "lucide-react";
import { motion } from "framer-motion";
import RatingStars from "../components/ui/RatingStars";
import PageTransition from "../components/PageTransition";

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipes, toggleFavorite, isFavorite } = useRecipes();
  const [activeTab, setActiveTab] = useState("instructions");
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [servings, setServings] = useState(0);

  const recipe = recipes.find((r) => r.id === parseInt(id));

  React.useEffect(() => {
    if (recipe) setServings(recipe.servings);
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Recipe not found
      </div>
    );
  }

  const toggleStep = (index) => {
    setCheckedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isFav = isFavorite(recipe.id);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFAF9] pb-20">
        {/* Hero Image */}
        <div className="relative h-[60vh] lg:h-[70vh]">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-0 left-0 right-0 p-6 container mx-auto">
            <Link
              to="/recipes"
              className="inline-flex items-center text-white/90 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full"
            >
              <ArrowLeft size={20} className="mr-2" /> Back to Recipes
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-3 mb-4">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-500/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                {recipe.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/90 mb-8">
                <RatingStars
                  rating={recipe.rating}
                  reviews={recipe.reviews}
                  size={20}
                />
                <div className="w-px h-6 bg-white/30" />
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat size={20} />
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame size={20} />
                  <span>{recipe.calories}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => toggleFavorite(recipe.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isFav
                      ? "bg-red-500 text-white"
                      : "bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
                  }`}
                >
                  <Heart size={24} fill={isFav ? "currentColor" : "none"} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 flex items-center justify-center transition-all">
                  <Share2 size={24} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 flex items-center justify-center transition-all">
                  <Printer size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">
                  About this recipe
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {recipe.description}
                </p>
              </section>

              {/* Tabs */}
              <div className="border-b border-slate-200 flex gap-8">
                <button
                  onClick={() => setActiveTab("instructions")}
                  className={`pb-4 text-lg font-bold transition-colors relative ${
                    activeTab === "instructions"
                      ? "text-primary-600"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Instructions
                  {activeTab === "instructions" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("nutrition")}
                  className={`pb-4 text-lg font-bold transition-colors relative ${
                    activeTab === "nutrition"
                      ? "text-primary-600"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  Nutrition
                  {activeTab === "nutrition" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"
                    />
                  )}
                </button>
              </div>

              {/* Content based on Tab */}
              <div className="min-h-[400px]">
                {activeTab === "instructions" ? (
                  <div className="space-y-8">
                    {recipe.instructions.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex gap-6 p-6 rounded-3xl transition-all cursor-pointer ${
                          checkedSteps.includes(index)
                            ? "bg-primary-50 border border-primary-100"
                            : "bg-white border border-slate-100 hover:border-primary-200"
                        }`}
                        onClick={() => toggleStep(index)}
                      >
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${
                            checkedSteps.includes(index)
                              ? "bg-primary-500 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {checkedSteps.includes(index) ? (
                            <CheckCircle size={20} />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div>
                          <h4
                            className={`font-bold mb-2 ${
                              checkedSteps.includes(index)
                                ? "text-primary-900 line-through opacity-50"
                                : "text-slate-900"
                            }`}
                          >
                            Step {index + 1}
                          </h4>
                          <p
                            className={`leading-relaxed ${
                              checkedSteps.includes(index)
                                ? "text-primary-700 opacity-50"
                                : "text-slate-600"
                            }`}
                          >
                            {step}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-xl font-bold mb-6">Nutrition Facts</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {Object.entries(recipe.nutrition).map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-slate-50 p-4 rounded-2xl text-center"
                        >
                          <span className="block text-slate-500 text-sm capitalize mb-1">
                            {key}
                          </span>
                          <span className="block text-xl font-bold text-slate-900">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 p-4 bg-blue-50 text-blue-700 rounded-xl text-sm">
                      * Percent Daily Values are based on a 2,000 calorie diet.
                      Your daily values may be higher or lower depending on your
                      calorie needs.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Ingredients Card */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-serif font-bold text-slate-900">
                      Ingredients
                    </h3>
                    <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-sm font-bold text-slate-600">
                      <span>{servings} Servings</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {recipe.ingredients.map((ing, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
                      >
                        <span className="text-slate-700 font-medium">
                          {ing.item}
                        </span>
                        <span className="text-slate-400 font-mono text-sm">
                          {ing.amount} {ing.unit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-slate-900/20">
                    Add to Shopping List
                  </button>
                </div>

                {/* Related Recipes Preview */}
                <div className="bg-primary-50 p-8 rounded-[2.5rem]">
                  <h3 className="text-xl font-serif font-bold text-primary-900 mb-4">
                    You might also like
                  </h3>
                  <div className="space-y-4">
                    {recipes
                      .filter(
                        (r) =>
                          r.category === recipe.category && r.id !== recipe.id
                      )
                      .slice(0, 2)
                      .map((r) => (
                        <Link
                          key={r.id}
                          to={`/recipe/${r.id}`}
                          className="flex gap-4 items-center group"
                        >
                          <img
                            src={r.image}
                            alt={r.title}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-primary-900 text-sm group-hover:underline">
                              {r.title}
                            </h4>
                            <span className="text-primary-600 text-xs">
                              {r.time}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default RecipeDetail;
