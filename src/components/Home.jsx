import React, { useState } from "react";
import RatingReview from "./RatingReview"; // Adjust the import path if needed

function Home() {
  const [rating, setRating] = useState(0); // Initialize the rating state

  return (
    <div>
      <RatingReview rating={rating} setRating={setRating} />
    </div>
  );
}

export default Home;
