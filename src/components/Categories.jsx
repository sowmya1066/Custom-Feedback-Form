import React, { useState } from "react";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ["Bug", "Content", "Other"];

  return (
    <div>
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => setSelectedCategory(category)}
          style={{
            backgroundColor: selectedCategory === category ? "blue" : "gray",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            margin: "5px",
            cursor: "pointer",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Categories;
