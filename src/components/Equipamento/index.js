import LogicaCadastros from "../LogicaCadastros";
import './Equipamento.css';

const Equipamento = () => {
  return (
    <LogicaCadastros
      entidadeMaiuscula={"Equipamento"}
      entidadeMinuscula={"equipamento"}
      entidadePluralMinuscula={"equipamentos"}
      subtituloEspecifico={"Digite o nome do equipamento e observações pertinentes a ele"}
      subtituloEspecificoLista={"Lista de equipamentos cadastrados para serem utilizados nos eventos do Senac"}
      labelCampo1={"Nome"}
      labelCampo2={"Observação"}
      placeHolderCampo1={"Digite o nome do equipamento"}
      placeHolderCampo2={"Digite uma observação do equipamento"}
      campo1={"Nome"}
      campo2={"Observação"}
      fields={["descricao", "observacao"]}
    />
  );
};

export default Equipamento;
