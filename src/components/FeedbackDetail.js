// src/components/FeedbackDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

function FeedbackDetail() {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      const docRef = doc(db, "forms", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data());
      }
    };
    fetchForm();
  }, [id]);

  if (!form) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography variant="h4">{form.title}</Typography>
      <Typography>Views: {form.views}</Typography>
      <Typography>Submissions: {form.submissions}</Typography>
      <List>
        {form.fields.map((field, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${field.label} - ${
                field.required ? "Required" : "Optional"
              }`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default FeedbackDetail;
