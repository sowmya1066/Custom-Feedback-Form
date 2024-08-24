import React, { useState } from "react";
import RatingReview from "./RatingReview";
import NumericRating from "./NumericRating";
import SmileyRating from "./SmileyRating";
import RadioButtons from "./RadioButtons";
import Categories from "./Categories"; // Import the Categories component

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
              <NumericRating />
            </div>
          );
        case "star-rating":
          return (
            <div key={index}>
              <label htmlFor={`star-rating-${index}`}>{field.label}</label>
              <RatingReview />
            </div>
          );
        case "smiley-rating":
          return (
            <div key={index}>
              <label htmlFor={`smiley-rating-${index}`}>{field.label}</label>
              <SmileyRating />
            </div>
          );
        case "radio-buttons":
          return (
            <div key={index}>
              <label htmlFor={`radio-buttons-${index}`}>{field.label}</label>
              <RadioButtons />
            </div>
          );
        case "categories":
          return (
            <div key={index}>
              <label htmlFor={`categories-${index}`}>{field.label}</label>
              <Categories />
            </div>
          );
        default:
          return null;
      }
    });
  };

  const renderFieldOptions = () => {
    return (
      <div>
        <button
          onClick={() => handleAddField("textarea", "Provide your comment")}
        >
          Add Textarea
        </button>
        <button
          onClick={() => handleAddField("numeric-rating", "Numeric Rating")}
        >
          Add Numeric Rating
        </button>
        <button onClick={() => handleAddField("star-rating", "Star Rating")}>
          Add Star Rating
        </button>
        <button
          onClick={() => handleAddField("smiley-rating", "Smiley Rating")}
        >
          Add Smiley Rating
        </button>
        <button
          onClick={() => handleAddField("radio-buttons", "Radio Buttons")}
        >
          Add Radio Buttons
        </button>
        <button onClick={() => handleAddField("categories", "Categories")}>
          Add Categories
        </button>
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
