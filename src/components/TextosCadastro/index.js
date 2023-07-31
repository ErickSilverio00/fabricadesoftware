import React from "react";
import "./TextosCadastro.css";
import { Typography } from "@mui/material";

const TextosCadastro = ({ titulo, subtitulo }) => {
  return (
    <div className="bloco-cadastro__box__textos">
      <Typography
        className="bloco-cadastro__box__titulo"
        variant="h3"
      >
        {titulo}
      </Typography>
      <Typography
        className="bloco-cadastro__box__subtitulo"
        variant="h6"
      >
        {subtitulo}
      </Typography>
    </div>
  );
};

export default TextosCadastro;
