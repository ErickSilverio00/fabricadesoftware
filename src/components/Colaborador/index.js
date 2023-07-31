import LogicaCadastros from "../LogicaCadastros";
import './Colaborador.css';

const Colaborador = () => {
  return (
    <LogicaCadastros
      entidadeMaiuscula={"Colaborador"}
      entidadeMinuscula={"colaborador"}
      entidadePluralMinuscula={"colaboradores"}
      subtituloEspecifico={"Escolha o nome e o tipo do colaborador"}
      subtituloEspecificoLista={"Lista de colaboradores já cadastrados"}
      labelCampo1={"Nome"}
      labelCampo2={"Tipo"}
      placeHolderCampo1={"Digite o nome do colaborador"}
      placeHolderCampo2={"Digite o tipo do colaborador"}
      campo1={"Nome"}
      campo2={"Tipo"}
      fields={["nome", "tipoColaborador"]}
    />
  );
};

export default Colaborador;
