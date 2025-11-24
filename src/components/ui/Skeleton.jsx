import React from "react";
import { motion } from "framer-motion";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`bg-slate-200 animate-pulse rounded-md ${className}`}
      {...props}
    />
  );
};

export const RecipeCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm h-full">
      <Skeleton className="h-72 w-full" />
      <div className="p-8 space-y-4">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-10 w-32 mt-4 rounded-full" />
      </div>
    </div>
  );
};

export default Skeleton;
