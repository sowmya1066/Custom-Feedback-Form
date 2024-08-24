import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NumericRating from "./NumericRating";
import RatingReview from "./RatingReview";
import SmileyRating from "./SmileyRating";
import RadioButtons from "./RadioButtons";
import Categories from "./Categories";
import {
  FaTrash,
  FaEdit,
  FaStar,
  FaRegSmile,
  FaVoteYea,
  FaListUl,
  FaRegComments,
  FaPlus,
} from "react-icons/fa"; // Importing icons from react-icons

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

  const deleteField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const editField = (index) => {
    const newValue = prompt("Enter new value:", fields[index].label);
    if (newValue) {
      const updatedFields = fields.map((field, i) =>
        i === index ? { ...field, label: newValue } : field
      );
      setFields(updatedFields);
    }
  };

  const Field = ({ index, id, type, label, value, onChange }) => {
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
        {type === "numeric-rating" && (
          <NumericRating value={value} onChange={onChange} />
        )}
        {type === "star-rating" && (
          <RatingReview value={value} onChange={onChange} />
        )}
        {type === "smiley-rating" && (
          <SmileyRating value={value} onChange={onChange} />
        )}
        {type === "radio-buttons" && (
          <RadioButtons value={value} onChange={onChange} />
        )}
        {type === "categories" && (
          <Categories value={value} onChange={onChange} />
        )}
        {type === "textarea" && (
          <textarea value={value} onChange={(e) => onChange(e.target.value)} />
        )}
        {type === "single-line" && (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{label}</span>
          <div>
            <FaEdit
              onClick={() => editField(index)}
              style={{ cursor: "pointer", marginRight: "10px" }}
            />
            <FaTrash
              onClick={() => deleteField(index)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
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
        value={field.value}
        onChange={(newValue) => {
          const updatedFields = fields.map((f, i) =>
            i === index ? { ...f, value: newValue } : f
          );
          setFields(updatedFields);
        }}
      />
    ));
  };

  const handleAddField = (fieldType, label) => {
    setFields([...fields, { type: fieldType, label, value: "" }]);
  };

  const renderFieldOptions = () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <FaRegComments style={{ fontSize: "20px", marginRight: "10px" }} />
        <span>Textarea</span>
        <FaPlus
          onClick={() => handleAddField("textarea", "Provide your comment")}
          style={{ cursor: "pointer", marginLeft: "92px" }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <FaVoteYea style={{ fontSize: "20px", marginRight: "10px" }} />
        <span>Numeric Rating</span>
        <FaPlus
          onClick={() => handleAddField("numeric-rating", "Numeric Rating")}
          style={{ cursor: "pointer", marginLeft: "40px" }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <FaStar style={{ fontSize: "20px", marginRight: "10px" }} />
        <span>Star Rating</span>
        <FaPlus
          onClick={() => handleAddField("star-rating", "Star Rating")}
          style={{ cursor: "pointer", marginLeft: "73px" }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <FaRegSmile style={{ fontSize: "20px", marginRight: "10px" }} />
        <span>Smiley Rating</span>
        <FaPlus
          onClick={() => handleAddField("smiley-rating", "Smiley Rating")}
          style={{ cursor: "pointer", marginLeft: "53px" }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <FaListUl style={{ fontSize: "20px", marginRight: "10px" }} />
        <span>Radio Buttons</span>
        <FaPlus
          onClick={() => handleAddField("radio-buttons", "Radio Buttons")}
          style={{ cursor: "pointer", marginLeft: "50px" }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <FaListUl style={{ fontSize: "20px", marginRight: "10px" }} />
        <span>Categories</span>
        <FaPlus
          onClick={() => handleAddField("categories", "Categories")}
          style={{ cursor: "pointer", marginLeft: "75px" }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <FaRegComments style={{ fontSize: "20px", marginRight: "10px" }} />
        <span>Single Line Input</span>
        <FaPlus
          onClick={() => handleAddField("single-line", "Single Line Input")}
          style={{ cursor: "pointer", marginLeft: "32px" }}
        />
      </div>
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="feedback-form">
        <div className="left-block" style={{ width: "60%", float: "left" }}>
          {renderFields()}
        </div>
        <div className="right-block" style={{ width: "35%", float: "right" }}>
          {renderFieldOptions()}
        </div>
      </div>
    </DndProvider>
  );
};

export default FeedbackForm;
