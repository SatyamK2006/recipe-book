import React from "react";
import {
  UtensilsCrossed,
  Heart,
  Github,
  Twitter,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-slate-900 p-2 rounded-lg text-white">
                <UtensilsCrossed size={20} />
              </div>
              <span className="text-xl font-serif font-bold text-slate-900">
                Culina<span className="text-primary-600">Share</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Discover, cook, and share delicious recipes from around the world.
              Join our community of food lovers today.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-pink-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Discover</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <Link
                  to="/recipes"
                  className="hover:text-primary-600 transition-colors"
                >
                  All Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?category=Breakfast"
                  className="hover:text-primary-600 transition-colors"
                >
                  Breakfast
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?category=Lunch"
                  className="hover:text-primary-600 transition-colors"
                >
                  Lunch
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?category=Dinner"
                  className="hover:text-primary-600 transition-colors"
                >
                  Dinner
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes?category=Dessert"
                  className="hover:text-primary-600 transition-colors"
                >
                  Dessert
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-600 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-600 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-600 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-600 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
            <p className="text-slate-500 text-sm mb-4">
              Subscribe to get the latest recipes and cooking tips delivered to
              your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-primary-600 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © 2025 CulinaShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
