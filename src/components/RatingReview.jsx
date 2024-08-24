import React, { useState } from "react";

function RatingReview() {
  const [rating, setRating] = useState(0); // Initialize rating to 0

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="star"
          style={{
            cursor: "pointer",
            color: rating >= star ? "gold" : "grey", // Stars up to the rating are yellow, others are red
            fontSize: "35px",
          }}
          onClick={() => setRating(star)} // Update rating on click
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default RatingReview;
