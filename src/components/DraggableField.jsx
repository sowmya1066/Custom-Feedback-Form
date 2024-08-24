// DraggableField.js
import React from "react";
import { useDrag } from "react-dnd";

const DraggableField = ({ id, type, label, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "FIELD",
    item: { id, type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "5px",
        backgroundColor: "white",
        cursor: "move",
      }}
    >
      {children || label}
    </div>
  );
};

export default DraggableField;
