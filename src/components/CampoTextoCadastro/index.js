import React from "react";
import "./CampoTextoCadastro.css";
import { TextField } from "@mui/material";

const CampoTextoCadastro = ({ id, label, placeholder, size, value, onChange, textoDeAjuda, error }) => {
  return (
    <TextField
      id={id}
      label={label}
      placeholder={placeholder}
      required
      margin="normal"
      fullWidth
      variant="filled"
      size={size}
      sx={{
        "& .MuiFilledInput-input": {
          backgroundColor: "white",
        }, marginBottom: "0px",
        marginTop: "0px"
      }}
      value={value}
      onChange={onChange}
      helperText={textoDeAjuda}
      error={!!error}
    />
  );
};

export default CampoTextoCadastro;
