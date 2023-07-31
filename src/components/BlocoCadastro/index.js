import { Box, Container } from "@mui/material";
import React from "react";
import "./BlocoCadastro.css";

const BlocoCadastro = ({ children }) => {
  return (
    <Container
      className="bloco-cadastro"
      maxWidth="sm"
    >
      <Box className="bloco-cadastro__box">
        {children}
      </Box>
    </Container>
  );
};

export default BlocoCadastro;
