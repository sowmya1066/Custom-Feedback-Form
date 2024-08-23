// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button, Card, CardContent, Typography } from "@mui/material";

function Dashboard() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const formsCollection = await getDocs(collection(db, "forms"));
      setForms(
        formsCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "forms", id));
    setForms(forms.filter((form) => form.id !== id));
  };

  return (
    <div>
      <Button component={Link} to="/create" variant="contained">
        New Form
      </Button>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        {forms.map((form) => (
          <Card key={form.id}>
            <CardContent>
              <Typography variant="h6">{form.title}</Typography>
              <Typography>Submitted: {form.submissions}</Typography>
              <Typography>Viewed: {form.views}</Typography>
              <Typography>Date Published: {form.datePublished}</Typography>
              <Button
                component={Link}
                to={`/details/${form.id}`}
                variant="outlined"
              >
                View Submissions
              </Button>
              <Button
                component={Link}
                to={`/edit/${form.id}`}
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(form.id)}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
