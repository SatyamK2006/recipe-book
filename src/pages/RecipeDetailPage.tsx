import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMealById } from '../api/mealHooks';
import { parseIngredients } from '../utils/ingredientParser';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, PlayCircle, Loader2, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: meal, isLoading, isError } = useMealById(id || '');
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem('mealdb_favorites');
      const favorites = saved ? JSON.parse(saved) : [];
      setIsFavorite(favorites.includes(id));
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!id) return;
    const saved = localStorage.getItem('mealdb_favorites');
    let favorites = saved ? JSON.parse(saved) : [];
    
    if (favorites.includes(id)) {
      favorites = favorites.filter((fav: string) => fav !== id);
      setIsFavorite(false);
    } else {
      favorites.push(id);
      setIsFavorite(true);
    }
    localStorage.setItem('mealdb_favorites', JSON.stringify(favorites));
  };

  const toggleStep = (index: number) => {
    setCheckedSteps(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
        <Loader2 className="animate-spin text-primary-600" size={40} />
      </div>
    );
  }

  if (isError || !meal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Recipe not found</h2>
          <Link to="/search" className="text-primary-600 hover:underline">Back to search</Link>
        </div>
      </div>
    );
  }

  const ingredients = parseIngredients(meal);
  const instructions = meal.strInstructions
    .split(/\r\n|\n/)
    .filter(line => line.trim().length > 0);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#FAFAF9] pb-20">
        {/* Hero */}
        <div className="relative h-[60vh]">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-0 left-0 right-0 p-6 container mx-auto">
            <Link to="/search" className="inline-flex items-center text-white/90 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
              <ArrowLeft size={20} className="mr-2" /> Back to Search
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 bg-primary-500/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  {meal.strCategory}
                </span>
                <span className="px-3 py-1 bg-slate-700/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  {meal.strArea}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                {meal.strMeal}
              </h1>

              <div className="flex gap-4">
                <button 
                  onClick={toggleFavorite}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
                  }`}
                >
                  <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                {meal.strYoutube && (
                  <a 
                    href={meal.strYoutube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-12 px-6 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 font-bold transition-all"
                  >
                    <PlayCircle size={24} /> Watch Video
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Instructions</h2>
                <div className="space-y-6">
                  {instructions.map((step, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`flex gap-6 p-6 rounded-3xl transition-all cursor-pointer ${
                        checkedSteps.includes(index) ? 'bg-primary-50 border border-primary-100' : 'bg-white border border-slate-100 hover:border-primary-200'
                      }`}
                      onClick={() => toggleStep(index)}
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${
                        checkedSteps.includes(index) ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {checkedSteps.includes(index) ? <CheckCircle size={20} /> : index + 1}
                      </div>
                      <div>
                        <p className={`leading-relaxed text-lg ${checkedSteps.includes(index) ? 'text-primary-700 opacity-50' : 'text-slate-600'}`}>
                          {step}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Ingredients</h3>
                  <div className="space-y-4">
                    {ingredients.map((ing, index) => (
                      <div key={index} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
                        <img src={ing.image} alt={ing.name} className="w-10 h-10 object-contain" />
                        <div className="flex-1">
                          <span className="block text-slate-900 font-bold capitalize">{ing.name}</span>
                          <span className="block text-slate-500 text-sm">{ing.measure}</span>
                        </div>
                      </div>
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

export default RecipeDetailPage;
