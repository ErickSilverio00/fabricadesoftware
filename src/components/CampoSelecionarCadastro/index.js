import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./CampoSelecionarCadastro.css";

const CampoSelecionarCadastro = ({ label, itens, valorSelecionado, size, onChange }) => {
  const mudarValor = (event) => {
    const valor = event.target.value
    const selectedItem = itens.find((item) => item.id === valor);
    onChange(selectedItem);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth className="cadastro-box__campos__escolhas__escolha">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={valorSelecionado ? valorSelecionado.id : ""}
          label={label}
          size={size}
          required
          sx={{ backgroundColor: "white", width: "100%" }}
          onChange={mudarValor}
        >
          {itens.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {label === "Equipamento" ? item.descricao : item.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CampoSelecionarCadastro;
