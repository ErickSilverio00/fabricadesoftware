import { Box, Container } from "@mui/material";
import React from "react";
import "./BlocoEvento.css";

const BlocoEvento = ({ children }) => {
  return (
    <Container
      className="bloco-evento"
      maxWidth="sm"
    >
      <Box className="bloco-evento__box">
        {children}
      </Box>
    </Container>
  );
};

export default BlocoEvento;
