import "./Local.css";
import LogicaCadastros from "../LogicaCadastros";

const Local = () => {
  return (
    <LogicaCadastros
      entidadeMaiuscula={"Local"}
      entidadeMinuscula={"local"}
      entidadePluralMinuscula={"locais"}
      subtituloEspecifico={"Digite o local no qual o evento será realizado"}
      subtituloEspecificoLista={"Lista de locais aptos a sediar eventos do Senac"}
      labelCampo1={"Nome"}
      labelCampo2={"Observação"}
      placeHolderCampo1={"Digite o nome do local"}
      placeHolderCampo2={"Digite uma observação do local"}
      campo1={"Nome"}
      campo2={"Observação"}
      fields={["nome", "observacao"]}
    />
  );
};

export default Local;
