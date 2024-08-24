import React, { useState } from "react";
import {
  FaRegMeh,
  FaFrown,
  FaSmile,
  FaLaugh,
  FaGrinStars,
} from "react-icons/fa"; // Import FontAwesome icons

const SmileyRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (index) => {
    setRating(index);
  };

  const icons = [
    <FaFrown />, // Very Bad
    <FaRegMeh />, // Bad
    <FaSmile />, // Neutral
    <FaLaugh />, // Good
    <FaGrinStars />, // Very Good
  ];

  return (
    <div className="smiley-rating">
      {icons.map((icon, index) => (
        <span
          key={index}
          className={`smiley ${rating === index + 1 ? "selected" : ""}`}
          onClick={() => handleClick(index + 1)}
          style={{
            fontSize: "24px",
            cursor: "pointer",
            color: rating === index + 1 ? "gold" : "gray",
            transition: "color 0.3s",
          }}
        >
          {icon}
        </span>
      ))}
    </div>
  );
};

export default SmileyRating;
