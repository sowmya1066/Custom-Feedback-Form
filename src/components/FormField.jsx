// FeedbackForm.js
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableField from "./DraggableField";
import NumericRating from "./NumericRating";
import RatingReview from "./RatingReview";
import SmileyRating from "./SmileyRating";
import RadioButtons from "./RadioButtons";
import Categories from "./Categories";

const ItemTypes = {
  FIELD: "FIELD",
};

const FeedbackForm = () => {
  const [fields, setFields] = useState([]);

  const moveField = (dragIndex, hoverIndex) => {
    const updatedFields = [...fields];
    const [removed] = updatedFields.splice(dragIndex, 1);
    updatedFields.splice(hoverIndex, 0, removed);
    setFields(updatedFields);
  };

  const Field = ({ index, id, type, label }) => {
    const [, ref] = useDrop({
      accept: ItemTypes.FIELD,
      hover: (item) => {
        if (item.id !== id) {
          moveField(item.index, index);
          item.index = index;
        }
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.FIELD,
      item: { id, index, type, label },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={(node) => drag(ref(node))}
        style={{
          opacity: isDragging ? 0.5 : 1,
          border: "1px solid gray",
          padding: "10px",
          marginBottom: "5px",
          backgroundColor: "white",
          cursor: "move",
        }}
      >
        {type === "numeric-rating" && <NumericRating />}
        {type === "star-rating" && <RatingReview />}
        {type === "smiley-rating" && <SmileyRating />}
        {type === "radio-buttons" && <RadioButtons />}
        {type === "categories" && <Categories />}
        {type === "textarea" && <textarea />}
        {label}
      </div>
    );
  };

  const renderFields = () => {
    return fields.map((field, index) => (
      <Field
        key={index}
        index={index}
        id={field.type + index}
        type={field.type}
        label={field.label}
      />
    ));
  };

  const handleAddField = (fieldType, label) => {
    setFields([...fields, { type: fieldType, label }]);
  };

  const renderFieldOptions = () => (
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
      <button onClick={() => handleAddField("smiley-rating", "Smiley Rating")}>
        Add Smiley Rating
      </button>
      <button onClick={() => handleAddField("radio-buttons", "Radio Buttons")}>
        Add Radio Buttons
      </button>
      <button onClick={() => handleAddField("categories", "Categories")}>
        Add Categories
      </button>
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="feedback-form">
        <div className="left-block">{renderFields()}</div>
        <div className="right-block">{renderFieldOptions()}</div>
      </div>
    </DndProvider>
  );
};

export default FeedbackForm;
