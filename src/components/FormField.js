// src/components/FormField.js
import React from "react";
import {
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function FormField({ field, onChange, onDelete }) {
  const handleFieldChange = (key, value) => {
    onChange({ ...field, [key]: value });
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <TextField
        label="Label"
        value={field.label}
        onChange={(e) => handleFieldChange("label", e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={field.required}
            onChange={(e) => handleFieldChange("required", e.target.checked)}
          />
        }
        label="Required"
      />
      {field.required && (
        <TextField
          label="Error Message"
          value={field.errorMessage}
          onChange={(e) => handleFieldChange("errorMessage", e.target.value)}
          fullWidth
          margin="normal"
        />
      )}
      <IconButton onClick={onDelete} color="secondary">
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default FormField;
