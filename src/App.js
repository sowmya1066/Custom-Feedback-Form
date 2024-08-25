import React, { useState } from "react";
import FeedbackForm from "./components/FormField";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputName, setInputName] = useState("");

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCreateForm = () => {
    if (inputName.trim()) {
      setFormName(inputName);
      setIsFormOpen(true);
      setInputName("");
      setDialogOpen(false);
    }
  };

  return (
    <div>
      {!isFormOpen && (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            + Add Feedback Form
          </Button>
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Create Feedback Form</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Form Name"
                type="text"
                fullWidth
                variant="outlined"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleCreateForm}
                color="primary"
                disabled={!inputName.trim()}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {isFormOpen && (
        <FeedbackForm
          formName={formName}
          onEditFormName={(newName) => setFormName(newName)}
        />
      )}
    </div>
  );
};

export default App;
