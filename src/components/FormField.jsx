import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NumericRating from "./NumericRating";
import RatingReview from "./RatingReview";
import SmileyRating from "./SmileyRating";
import RadioButtons from "./RadioButtons";
import Categories from "./Categories";
import CategoryIcon from "../assets/cate_icon.png";
import InputIcon from "../assets/input_icon.png";
import NumericalIcon from "../assets/numerical_icon.png";
import RadioIcon from "../assets/radio_icon.png";
import SmileyIcon from "../assets/smiley_icon.png";
import StarIcon from "../assets/star_icon.png";
import TextAreaIcon from "../assets/textarea_icon.png";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"; // Importing icons from react-icons

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
        <img
          src={TextAreaIcon}
          alt="Textarea"
          style={{ width: "20px", marginRight: "10px" }}
        />
        <span>Textarea</span>
        <FaPlus
          className="blue-icon"
          onClick={() => handleAddField("textarea", "Provide your comment")}
          style={{ cursor: "pointer", marginLeft: "92px" }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <img
          src={NumericalIcon}
          alt="Numeric Rating"
          style={{ width: "20px", marginRight: "10px" }}
        />
        <span>Numeric Rating</span>
        <FaPlus
          className="blue-icon"
          onClick={() => handleAddField("numeric-rating", "Numeric Rating")}
          style={{ cursor: "pointer", marginLeft: "40px" }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <img
          src={StarIcon}
          alt="Star Rating"
          style={{ width: "20px", marginRight: "10px" }}
        />
        <span>Star Rating</span>
        <FaPlus
          className="blue-icon"
          onClick={() => handleAddField("star-rating", "Star Rating")}
          style={{ cursor: "pointer", marginLeft: "73px" }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <img
          src={SmileyIcon}
          alt="Smiley Rating"
          style={{ width: "20px", marginRight: "10px" }}
        />
        <span>Smiley Rating</span>
        <FaPlus
          className="blue-icon"
          onClick={() => handleAddField("smiley-rating", "Smiley Rating")}
          style={{ cursor: "pointer", marginLeft: "53px" }}
        />
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <img
          src={InputIcon}
          alt="Single Line Input"
          style={{ width: "20px", marginRight: "10px" }}
        />
        <span>Single Line Input</span>
        <FaPlus
          className="blue-icon"
          onClick={() => handleAddField("single-line", "Single Line Input")}
          style={{ cursor: "pointer", marginLeft: "32px" }}
        />
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <img
          src={RadioIcon}
          alt="Radio Buttons"
          style={{ width: "20px", marginRight: "10px" }}
        />
        <span>Radio Buttons</span>
        <FaPlus
          className="blue-icon"
          onClick={() => handleAddField("radio-buttons", "Radio Buttons")}
          style={{ cursor: "pointer", marginLeft: "50px" }}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <img
          src={CategoryIcon}
          alt="Categories"
          style={{ width: "20px", marginRight: "10px" }}
        />
        <span>Categories</span>
        <FaPlus
          className="blue-icon"
          onClick={() => handleAddField("categories", "Categories")}
          style={{ cursor: "pointer", marginLeft: "75px" }}
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
