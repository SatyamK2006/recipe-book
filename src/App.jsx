import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { RecipeProvider } from "./context/RecipeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import { AnimatePresence } from "framer-motion";
import SearchPage from "./pages/SearchPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import SignIn from "./pages/SignIn";

// Wrapper for AnimatePresence to work with Routes
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        {/* API Routes */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/meal/:id" element={<RecipeDetailPage />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="min-h-screen bg-[#FAFAF9] font-sans text-slate-900 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;
