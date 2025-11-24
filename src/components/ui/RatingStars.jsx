import React from "react";
import { Star, StarHalf } from "lucide-react";

const RatingStars = ({ rating, reviews, size = 16 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="currentColor" />
        ))}
        {hasHalfStar && <StarHalf size={size} fill="currentColor" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            className="text-slate-200"
            fill="currentColor"
          />
        ))}
      </div>
      {reviews && (
        <span className="text-xs text-slate-500 font-medium">
          ({reviews} reviews)
        </span>
      )}
    </div>
  );
};

export default RatingStars;
