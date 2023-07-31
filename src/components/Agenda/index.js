import { useEffect, useState } from "react";
import Variaveis from "../../assets/variaveis/variaveis";
import BlocoCadastro from "../BlocoCadastro";
import Botao from "../Botao";
import CampoDataCadastro from "../CampoDataCadastro";
import CampoSelecionarCadastro from "../CampoSelecionarCadastro";
import CampoTextoCadastro from "../CampoTextoCadastro";
import TextosCadastro from "../TextosCadastro";
import "./Agenda.css";
import {
  validacaoData,
  validacaoObservacao,
  validacaoTitulo,
} from "./validacoes";
import SnackBar from "../SnackBar";

const Agenda = () => {
  const [titulo, setTitulo] = useState("");
  const [erroTitulo, setErroTitulo] = useState("");
  const [dataInicio, setDataInicio] = useState(null);
  const [dataTermino, setDataTermino] = useState(null);
  const [erroData, setErroData] = useState("");
  const [dataInicioErro, setDataInicioErro] = useState("");
  const [dataTerminoErro, setDataTerminoErro] = useState("");
  const [colaboradores, setColaboradores] = useState([]);
  const [colaborador, setColaborador] = useState(null);
  const [locais, setLocais] = useState([]);
  const [local, setLocal] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);
  const [equipamento, setEquipamento] = useState(null);
  const [observacao, setObservacao] = useState("");
  const [erroObservacao, setErroObservacao] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [mensagemSnackBar, setMensagemSnackBar] = useState("");
  const [tipoSnackBar, setTipoSnackBar] = useState("success");

  useEffect(() => {
    fetchColaboradores();
    fetchLocais();
    fetchEquipamentos();
  }, []);

  const mudandoTitulo = (event) => {
    const valor = event.target.value;
    setTitulo(valor);

    const validacao = validacaoTitulo(valor);
    setErroTitulo(validacao.mensagem);
  };

  const mudandoObservacao = (event) => {
    const valor = event.target.value;
    setObservacao(valor);

    const validacao = validacaoObservacao(valor);
    setErroObservacao(validacao.mensagem);
  };

  const mudandoDataInicio = (value) => {
    setDataInicio(new Date(value));
    const validacao = validacaoData(new Date(value), dataTermino);
    setDataInicioErro(validacao.mensagem);
    setErroData(validacao.mensagem);
  };

  const mudandoDataTermino = (value) => {
    setDataTermino(new Date(value));
    const validacao = validacaoData(dataInicio, new Date(value));
    setDataTerminoErro(validacao.mensagem);
    setErroData(validacao.mensagem);
  };

  const fetchColaboradores = () => {
    fetch("http://localhost:8080/colaboradores")
      .then((response) => response.json())
      .then((data) => {
        setColaboradores(data);
      })
      .catch((error) => {
        setMensagemSnackBar("Erro ao buscar colaboradores", error);
        setTipoSnackBar("error");
        setOpenSnackBar(true);
      });
  };

  const fetchLocais = () => {
    fetch("http://localhost:8080/locais")
      .then((response) => response.json())
      .then((data) => {
        setLocais(data);
      })
      .catch((error) => {
        setMensagemSnackBar("Erro ao buscar locais", error);
        setTipoSnackBar("error");
        setOpenSnackBar(true);
      });
  };

  const fetchEquipamentos = () => {
    fetch("http://localhost:8080/equipamentos")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEquipamentos(data);
        } else {
          setMensagemSnackBar(
            "Erro ao buscar equipamentos: formato de data inválido"
          );
          setTipoSnackBar("error");
          setOpenSnackBar(true);
        }
      })
      .catch((error) => {
        setMensagemSnackBar("Erro ao buscar equipamentos", error);
        setTipoSnackBar("error");
        setOpenSnackBar(true);
      });
  };

  const salvar = () => {
    if (!dataInicio || !dataTermino) {
      setMensagemSnackBar("Por favor, preencha as datas de início e término.");
      setTipoSnackBar("error");
      setOpenSnackBar(true);
      return;
    }

    const novaAgenda = {
      titulo: titulo,
      dataInicio: dataInicio,
      dataTermino: dataTermino,
      observacao: observacao,
      colaborador: colaborador,
      local: local,
      equipamento: equipamento,
    };
    fetch("http://localhost:8080/agendas", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(novaAgenda),
    })
      .then((res) => {
        if (res.ok) {
          setMensagemSnackBar(`Evento salvo com sucesso!`);
          setTipoSnackBar("success");
          setOpenSnackBar(true);
          fetchColaboradores();
          fetchEquipamentos();
          fetchLocais();
          limpar();
        } else {
          setMensagemSnackBar(`Erro ao salvar Evento!`);
          setTipoSnackBar("error");
          setOpenSnackBar(true);
        }
      })
      .catch((error) => {
        setMensagemSnackBar(`Erro na requisição: ${error.message}`);
        setTipoSnackBar("error");
        setOpenSnackBar(true);
      });
  };

  const limpar = () => {
    setTitulo("");
    setDataInicio(null);
    setDataTermino(null);
    setLocal(null);
    setColaborador(null);
    setEquipamento(null);
    setLocais([]);
    setColaboradores([]);
    setEquipamentos([]);
    setObservacao("");
  };

  const aoEnviarAgenda = (e) => {
    e.preventDefault();

    if (
      (titulo && titulo.trim().length < 5) ||
      (observacao && observacao.trim().length < 5) ||
      (dataInicio &&
        dataTermino &&
        new Date(dataTermino) <= new Date(dataInicio))
    ) {
      setMensagemSnackBar("Corrija os erros mostrados na tela!");
      setTipoSnackBar("error");
      setOpenSnackBar(true);
      return;
    }

    salvar();
  };

  return (
    <BlocoCadastro>
      <form onSubmit={aoEnviarAgenda}>
        <TextosCadastro
          titulo={"Cadastro de Agenda"}
          subtitulo={"Insira as informações sobre o evento que será cadastrado"}
        />
        <div className="cadastro-box__campos">
          <CampoTextoCadastro
            id={"titulo"}
            label={"Título"}
            placeholder={"Digite o título do evento"}
            value={titulo}
            onChange={mudandoTitulo}
            error={!!erroTitulo}
            textoDeAjuda={erroTitulo}
          />
          <div className="cadastro-box__campos__datas">
            <CampoDataCadastro
              id={"dataInicio"}
              label={"Data Início"}
              value={dataInicio}
              onChange={mudandoDataInicio}
              error={!!dataInicioErro}
              helperText={dataInicioErro}
            />
            <CampoDataCadastro
              id={"dataTermino"}
              label={"Data Término"}
              value={dataTermino}
              onChange={mudandoDataTermino}
              error={!!dataTerminoErro}
              helperText={dataTerminoErro}
            />
          </div>
          {dataTerminoErro && (
            <p className="cadastro-box__campos__datas__erro">
              {dataTerminoErro}
            </p>
          )}
          <div className="cadastro-box__campos__escolhas">
            <CampoSelecionarCadastro
              label={"Local"}
              itens={locais}
              valorSelecionado={local}
              onChange={(value) => setLocal(value)}
            />
            <CampoSelecionarCadastro
              label={"Colaborador"}
              itens={colaboradores}
              valorSelecionado={colaborador}
              onChange={(value) => setColaborador(value)}
            />
            <CampoSelecionarCadastro
              label={"Equipamento"}
              itens={equipamentos}
              valorSelecionado={equipamento}
              onChange={(value) => setEquipamento(value)}
            />
          </div>
          <CampoTextoCadastro
            id={"observacao"}
            label={"Observação"}
            placeholder={"Digite uma observação"}
            value={observacao}
            onChange={mudandoObservacao}
            error={!!erroObservacao}
            textoDeAjuda={erroObservacao}
          />
        </div>
        <div className="cadastro-box__botoes">
          <Botao
            corDeFundo={Variaveis.corLaranja}
            corDeFundoHover={Variaveis.corLaranjaEscura}
            texto={"Salvar"}
            type="submit"
            disabled={!dataInicio || !dataTermino}
          />
        </div>
      </form>
      <SnackBar
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        tipoMensagem={tipoSnackBar}
        mensagem={mensagemSnackBar}
      />
    </BlocoCadastro>
  );
};

export default Agenda;
