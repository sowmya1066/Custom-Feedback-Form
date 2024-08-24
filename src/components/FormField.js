import React, { useState } from "react";

function FeedbackForm() {
  const [fields, setFields] = useState([]);

  const handleAddField = (fieldType, label) => {
    setFields([...fields, { type: fieldType, label }]);
  };

  const renderFields = () => {
    return fields.map((field, index) => {
      switch (field.type) {
        case "textarea":
          return (
            <div key={index}>
              <label htmlFor={`field-${index}`}>{field.label}</label>
              <textarea id={`field-${index}`} />
            </div>
          );
        case "numeric-rating":
          return (
            <div key={index}>
              <label htmlFor={`numeric-rating-${index}`}>{field.label}</label>
              <input
                type="number"
                id={`numeric-rating-${index}`}
                min="1"
                max="5"
              />
            </div>
          );
        // ... other field types
        default:
          return null;
      }
    });
  };

  const renderFieldOptions = () => {
    return (
      <div>
        <button
          onClick={() => handleAddField("textarea", "provide your comment")}
        >
          Add Textarea
        </button>
        <button
          onClick={() => handleAddField("numeric-rating", "Numeric Rating")}
        >
          Add Numeric Rating
        </button>
        {/* Add buttons for other field types here */}
      </div>
    );
  };

  return (
    <div className="feedback-form">
      <div className="left-block">{renderFields()}</div>
      <div className="right-block">{renderFieldOptions()}</div>
    </div>
  );
}

export default FeedbackForm;
