import React, { useState } from "react";

function NumericRating() {
  const [selectedNumber, setSelectedNumber] = useState(null); // Initialize selected number to null

  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
        <span
          key={number}
          style={{
            cursor: "pointer",
            color: selectedNumber === number ? "green" : "gray", // Highlight only the clicked number
            fontSize: "25px",
            marginRight: "10px", // Add some space between numbers
          }}
          onClick={() => setSelectedNumber(number)} // Update selected number on click
        >
          {number}
        </span>
      ))}
    </div>
  );
}

export default NumericRating;
