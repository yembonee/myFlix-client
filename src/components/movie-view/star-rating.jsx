import React from "react";
import { useState, useEffect } from "react";

const StarRating = ({ movieId, handleRating, initialRating }) => {
  const [selectedRating, setSelectedRating] = useState(initialRating || 0);

  useEffect(() => {
    setSelectedRating(initialRating || 0);
  }, [initialRating]);

  const onRatingSelect = (rating) => {
    setSelectedRating(rating);
    handleRating(movieId, rating);
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => (
        <span
          key={index}
          onClick={() => onRatingSelect(index + 1)}
          style={{ fontSize: "24px" }}
        >
          {index + 1 <= selectedRating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
