import React, { useState } from "react";
import FeedbackForm from "./components/FormField";
import { FaPlus } from "react-icons/fa"; // Import FaPlus icon

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  return (
    <>
      {!showForm && (
        <div className="add-form-container">
          <button onClick={handleOpenForm}>
            <FaPlus size="24" className="add-icon" /> Add Feedback Form
          </button>
        </div>
      )}
      {showForm && <FeedbackForm onClose={() => setShowForm(false)} />}
    </>
  );
}

export default App;
