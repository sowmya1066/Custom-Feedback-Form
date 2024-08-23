// src/components/FormBuilder.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button, TextField, Typography } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FormField from "./FormField";

function FormBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchForm = async () => {
        const docRef = doc(db, "forms", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const form = docSnap.data();
          setTitle(form.title);
          setFields(form.fields);
        }
      };
      fetchForm();
    }
  }, [id]);

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        type: "text",
        label: "",
        required: false,
        errorMessage: "",
      },
    ]);
  };

  const handleFieldChange = (index, newField) => {
    const newFields = [...fields];
    newFields[index] = newField;
    setFields(newFields);
  };

  const handleFieldDelete = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newFields = Array.from(fields);
    const [movedField] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, movedField);
    setFields(newFields);
  };

  const handleSubmit = async () => {
    const form = {
      title,
      fields,
      submissions: 0,
      views: 0,
      datePublished: new Date().toLocaleDateString(),
    };
    if (id) {
      await setDoc(doc(db, "forms", id), form);
    } else {
      await setDoc(doc(db, "forms", `${Date.now()}`), form);
    }
    navigate("/");
  };

  return (
    <div>
      <Typography variant="h4">
        {id ? "Edit" : "Create"} Feedback Form
      </Typography>
      <TextField
        label="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleAddField} variant="contained">
        Add Field
      </Button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, index) => (
                <Draggable
                  key={field.id}
                  draggableId={String(field.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <FormField
                        field={field}
                        onChange={(newField) =>
                          handleFieldChange(index, newField)
                        }
                        onDelete={() => handleFieldDelete(index)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        {id ? "Save" : "Create"}
      </Button>
    </div>
  );
}

export default FormBuilder;
