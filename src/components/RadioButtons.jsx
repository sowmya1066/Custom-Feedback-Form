import React, { useState } from "react";

function RadioButtons() {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`radio-${index}`}
            name="radio-buttons"
            value={option}
            checked={selectedOption === option}
            onChange={() => setSelectedOption(option)}
          />
          <label htmlFor={`radio-${index}`}>{option}</label>
        </div>
      ))}
    </div>
  );
}

export default RadioButtons;
