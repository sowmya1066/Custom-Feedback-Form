// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FormBuilder from "./components/FormBuilder";
import FeedbackDetail from "./components/FeedbackDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<FormBuilder />} />
        <Route path="/edit/:id" element={<FormBuilder />} />
        <Route path="/details/:id" element={<FeedbackDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
