# Integration Guide: TheMealDB

This guide details how to integrate the new MealDB API components into your Antigravity IDE project.

## 1. Install Dependencies

Run the following command in your Antigravity IDE terminal:

```bash
npm install axios @tanstack/react-query lodash.debounce
npm install -D @types/lodash.debounce
```

## 2. Configure Environment Variables

Create or update `.env` in the project root:

```env
VITE_MEALDB_KEY=1
VITE_MEALDB_BASE=https://www.themealdb.com/api/json/v1
```

## 3. Setup QueryClientProvider

Open `src/main.jsx` (or `src/main.tsx`) and wrap your app with `QueryClientProvider`.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

## 4. Add Routes

Open `src/App.jsx` and add the new routes:

```jsx
import SearchPage from './pages/SearchPage';
import RecipeDetailPage from './pages/RecipeDetailPage';

// Inside <Routes>
<Route path="/search" element={<SearchPage />} />
<Route path="/recipe/:id" element={<RecipeDetailPage />} />
```

## 5. Verify Integration

1.  Restart the dev server:
    ```bash
    npm run dev
    ```
2.  Open your browser to `http://localhost:5173/search`.
3.  Type "Chicken" in the search bar. You should see a dropdown with suggestions.
4.  Click a suggestion or browse the categories below.
5.  Clicking a card should take you to the detailed recipe page.

## Notes

- **API Key**: The key `1` is a test key provided by TheMealDB. For production, you should get a real API key.
- **CORS**: TheMealDB supports CORS, so no proxy is needed.
- **Rate Limits**: The test key has some limits, but the implemented caching in `src/services/mealdb.ts` helps mitigate this.
