import React, { useState } from "react";
import "../index.css";

const SmileyRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (index) => {
    setRating(index);
  };

  const emojis = [
    "😡", // Very Bad
    "😞", // Bad
    "😐", // Neutral
    "😊", // Good
    "😍", // Very Good
  ];

  return (
    <div className="smiley-rating">
      {emojis.map((emoji, index) => (
        <span
          key={index}
          className={`smiley ${rating === index + 1 ? "selected" : ""}`}
          onClick={() => handleClick(index + 1)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default SmileyRating;
