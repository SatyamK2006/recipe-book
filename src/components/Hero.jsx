import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#FAFAF9]">
      {/* Abstract Shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-100/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-6">
                <span className="flex items-center gap-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Star size={12} fill="currentColor" /> Featured Recipe
                </span>
                <span className="text-slate-400 text-sm font-medium">
                  Daily curated inspiration
                </span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-serif font-bold text-slate-900 leading-[1.1] mb-8">
                Taste the <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary-800">
                    Extraordinary
                  </span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-secondary-300/50 -z-0 -rotate-1"></span>
                </span>
              </h1>

              <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Elevate your home cooking with our curated collection of
                world-class recipes. Simple enough for beginners, sophisticated
                enough for pros.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <Link to="/recipes">
                  <button className="px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 flex items-center gap-3 group">
                    Start Cooking
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>
                <button className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-full font-bold text-lg hover:border-slate-300 transition-all flex items-center gap-3">
                  <PlayCircle size={20} />
                  Watch Video
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-80">
                <div>
                  <p className="text-3xl font-bold text-slate-900">10k+</p>
                  <p className="text-sm text-slate-500">Active Users</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <p className="text-3xl font-bold text-slate-900">5k+</p>
                  <p className="text-sm text-slate-500">Recipes</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <p className="text-3xl font-bold text-slate-900">4.9</p>
                  <p className="text-sm text-slate-500">App Rating</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative w-full max-w-xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Gourmet Dish"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-serif mb-1">
                        Fresh Garden Salad
                      </h3>
                      <p className="text-white/80 text-sm">
                        with Balsamic Vinaigrette
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg text-sm font-bold">
                      <Star
                        size={14}
                        fill="currentColor"
                        className="text-yellow-400"
                      />{" "}
                      4.9
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-secondary-400 rounded-full blur-xl opacity-60 animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-500 rounded-full blur-xl opacity-60 animate-pulse delay-700" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
