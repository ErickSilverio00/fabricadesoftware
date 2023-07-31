import React from "react";
import "../../assets/variaveis/variaveis";
import "./Botao.css";
import { Button } from "@mui/material";

const Botao = ({corDeFundo, corDeFundoHover, texto, onClick, type, style}) => {
  return (
    <Button
      className="bloco-cadastro__box-botao"
      variant="contained"
      size="large"
      fullWidth
      sx={{
        backgroundColor: corDeFundo,
        "&:hover": { backgroundColor: corDeFundoHover },
        ...style, 
      }}
      onClick={onClick}
      type={type}
    >
      {texto}
    </Button>
  );
};

export default Botao;
