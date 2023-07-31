import { useEffect, useState } from "react";
import CampoTextoCadastro from "../CampoTextoCadastro";
import CampoDataCadastro from "../CampoDataCadastro";
import "./Evento.css";
import Botao from "../Botao";
import Variaveis from "../../assets/variaveis/variaveis";
import Dialogo from "../Dialogo";
import SnackBar from "../SnackBar";
import CampoSelecionarCadastro from "../CampoSelecionarCadastro";
import { validacaoData } from "../Agenda/validacoes";
import dayjs from "dayjs";
import BlocoEvento from "../BlocoEvento";

const Evento = () => {
  const [eventos, setEventos] = useState([]);
  const [eventosEditando, setEventosEditando] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [mensagemSnackBar, setMensagemSnackBar] = useState("");
  const [tipoSnackBar, setTipoSnackBar] = useState("success");
  const [exclusaoDialogOpen, setExclusaoDialogOpen] = useState(false);
  const [eventoParaDeletar, setEventoParaDeletar] = useState(null);
  const [itens, setItens] = useState({
    locais: [],
    colaboradores: [],
    equipamentos: [],
  });
  const [valoresEditados, setValoresEditados] = useState({});
  const [dataInicioErro, setDataInicioErro] = useState("");
  const [dataTerminoErro, setDataTerminoErro] = useState("");

  useEffect(() => {
    fetchEventos();
    fetchItens("equipamentos");
    fetchItens("colaboradores");
    fetchItens("locais");
  }, []);

  const fetchEventos = () => {
    fetch("http://localhost:8080/agendas")
      .then((response) => response.json())
      .then((data) => {
        setEventos(data);
      })
      .catch((error) => {
        setMensagemSnackBar("Erro ao buscar eventos" + error.message);
        setTipoSnackBar("error");
        setOpenSnackBar(true);
      });
  };

  const fetchItens = (tipo) => {
    fetch(`http://localhost:8080/${tipo}`)
      .then((response) => response.json())
      .then((data) => {
        setItens((prevItens) => ({ ...prevItens, [tipo]: data }));
      })
      .catch((error) => {
        setMensagemSnackBar(`Erro ao buscar ${tipo}`);
        setTipoSnackBar("error");
        setOpenSnackBar(true);
      });
  };

  const mudandoCampo = (id, campo, valor) => {
    if (campo === "dataInicio" || campo === "dataTermino") {
      const otherCampo = campo === "dataInicio" ? "dataTermino" : "dataInicio";
      const dataAtualizada =
        campo === "dataInicio" ? { dataInicio: valor } : { dataTermino: valor };

      setValoresEditados((prevValoresEditados) => {
        const newData = {
          ...prevValoresEditados[id],
          ...dataAtualizada,
        };

        const validacao = validacaoData(
          new Date(newData.dataInicio),
          new Date(newData.dataTermino)
        );

        setDataInicioErro(validacao.mensagem);
        setDataTerminoErro(validacao.mensagem);

        return {
          ...prevValoresEditados,
          [id]: {
            ...newData,
          },
        };
      });
    } else {
      setValoresEditados((prevValoresEditados) => ({
        ...prevValoresEditados,
        [id]: {
          ...prevValoresEditados[id],
          [campo]: valor,
        },
      }));
    }
  };

  const dataFormatada = (dateTimeString) => {
    if (!dateTimeString) {
      return "";
    }

    return dayjs(dateTimeString).format("DD/MM/YYYY HH:mm");
  };

  const toggleModoEdicao = (id) => {
    setEventosEditando((prevEventosEditando) => {
      if (prevEventosEditando.includes(id)) {
        return prevEventosEditando.filter((eventoId) => eventoId !== id);
      } else {
        return [...prevEventosEditando, id];
      }
    });

    const eventoSelecionado = eventos.find((evento) => evento.id === id);
    if (!eventoSelecionado) return;

    setValoresEditados((prevValoresEditados) => ({
      ...prevValoresEditados,
      [id]: {
        titulo: eventoSelecionado.titulo,
        dataInicio: eventoSelecionado.dataInicio
          ? new Date(eventoSelecionado.dataInicio)
          : null,
        dataTermino: eventoSelecionado.dataTermino
          ? new Date(eventoSelecionado.dataTermino)
          : null,
        local: eventoSelecionado.local || null,
        colaborador: eventoSelecionado.colaborador || null,
        equipamento: eventoSelecionado.equipamento || null,
        observacao: eventoSelecionado.observacao || "",
      },
    }));
  };

  const salvarEdicao = async (evento) => {
    const eventoEditado = valoresEditados[evento.id] || {};
    if (
      (eventoEditado.titulo && eventoEditado.titulo.trim().length < 5) ||
      (eventoEditado.observacao &&
        eventoEditado.observacao.trim().length < 5) ||
      (eventoEditado.dataInicio &&
        eventoEditado.dataTermino &&
        new Date(eventoEditado.dataTermino) <=
          new Date(eventoEditado.dataInicio))
    ) {
      setMensagemSnackBar("Corrija os erros mostrados na tela!");
      setTipoSnackBar("error");
      setOpenSnackBar(true);
      return;
    }

    const atualizarEvento = {
      titulo: eventoEditado.titulo || evento.titulo,
      dataInicio: eventoEditado.dataInicio
        ? dayjs(eventoEditado.dataInicio).toISOString()
        : null,
      dataTermino: eventoEditado.dataTermino
        ? dayjs(eventoEditado.dataTermino).toISOString()
        : null,
      local: eventoEditado.local || null,
      colaborador: eventoEditado.colaborador || null,
      equipamento: eventoEditado.equipamento || null,
      observacao: eventoEditado.observacao || "",
    };

    try {
      const response = await fetch(
        `http://localhost:8080/agendas/${evento.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(atualizarEvento),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao atualizar o evento");
      }
      const data = await response.json();
      if (typeof data === "object" && data !== null) {
        setMensagemSnackBar("Evento alterado com sucesso!");
        setTipoSnackBar("success");
        setOpenSnackBar(true);

        setEventosEditando((prevEventosEditando) =>
          prevEventosEditando.filter((eventoId) => eventoId !== evento.id)
        );

        setEventos((prevEventos) =>
          prevEventos.map((ev) => (ev.id === evento.id ? data : ev))
        );
      } else {
        setMensagemSnackBar("A resposta da API não contém campos esperados");
        setTipoSnackBar("error");
        setOpenSnackBar(true);
      }
    } catch (error) {
      setMensagemSnackBar(
        `Ocorreu um erro ao salvar as alterações: ${error.message}`
      );
      setTipoSnackBar("error");
      setOpenSnackBar(true);
    }
  };

  const abrirExclusao = (evento) => {
    setEventoParaDeletar(evento);
    setExclusaoDialogOpen(true);
  };

  const confirmarExclusao = (evento) => {
    if (evento) {
      fetch(`http://localhost:8080/agendas/${evento.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao excluir o evento");
          }
          setMensagemSnackBar("Evento excluído com sucesso!");
          setTipoSnackBar("success");
          setOpenSnackBar(true);
          setEventos((prevEventos) =>
            prevEventos.filter((ev) => ev.id !== evento.id)
          );
          setExclusaoDialogOpen(false);
        })
        .catch((error) => {
          setMensagemSnackBar(
            "Ocorreu um erro ao excluir o evento: " + error.message
          );
          setTipoSnackBar("error");
          setOpenSnackBar(true);
        });
    }
  };

  return (
    <>
      {eventos.map((evento) => (
        <li key={evento.id} className="eventos__evento__item">
          {eventosEditando.includes(evento.id) ? (
            <BlocoEvento>
              <div className="eventos__evento__modo-edicao">
                <h1>{evento.titulo}</h1>
                <div className="eventos__evento__modo-edicao__titulo">
                  <CampoTextoCadastro
                    label={"Titulo"}
                    placeholder={"Atualize o título do evento"}
                    size="small"
                    value={valoresEditados[evento.id]?.titulo || ""}
                    onChange={(e) =>
                      mudandoCampo(evento.id, "titulo", e.target.value)
                    }
                    error={
                      valoresEditados[evento.id] &&
                      (valoresEditados[evento.id]?.titulo.length < 5 ||
                        valoresEditados[evento.id]?.titulo.trim() === "")
                    }
                    textoDeAjuda={
                      valoresEditados[evento.id] &&
                      (valoresEditados[evento.id]?.titulo.length < 5 ||
                        valoresEditados[evento.id]?.titulo.trim() === "")
                        ? "O título deve ter pelo menos 5 caracteres!"
                        : ""
                    }
                  />
                </div>

                <div className="eventos__evento__modo-edicao__datas">
                  <div className="eventos__evento__modo-edicao__dataInicio">
                    <CampoDataCadastro
                      label={"Data Início"}
                      value={dayjs(
                        valoresEditados[evento.id]?.dataInicio ||
                          evento.dataInicio
                      )}
                      onChange={(date) =>
                        mudandoCampo(evento.id, "dataInicio", date)
                      }
                    />
                  </div>

                  <div className="eventos__evento__modo-edicao__dataTermino">
                    <CampoDataCadastro
                      label={"Data Término"}
                      value={dayjs(
                        valoresEditados[evento.id]?.dataTermino ||
                          evento.dataTermino
                      )}
                      onChange={(date) =>
                        mudandoCampo(evento.id, "dataTermino", date)
                      }
                    />
                  </div>
                </div>
                {dataTerminoErro && (
                  <p className="eventos__evento__modo-edicao__datas__erro">
                    {dataTerminoErro}
                  </p>
                )}

                <div className="eventos__evento__modo-edicao__linha3">
                  <CampoSelecionarCadastro
                    label={"Local"}
                    itens={itens.locais}
                    valorSelecionado={valoresEditados[evento.id]?.local}
                    onChange={(selectedLocal) =>
                      setValoresEditados((prevValoresEditados) => ({
                        ...prevValoresEditados,
                        [evento.id]: {
                          ...prevValoresEditados[evento.id],
                          local: selectedLocal,
                        },
                      }))
                    }
                  />
                  <CampoSelecionarCadastro
                    label={"Colaborador"}
                    itens={itens.colaboradores}
                    valorSelecionado={valoresEditados[evento.id]?.colaborador}
                    onChange={(selectedColaborador) =>
                      setValoresEditados((prevValoresEditados) => ({
                        ...prevValoresEditados,
                        [evento.id]: {
                          ...prevValoresEditados[evento.id],
                          colaborador: selectedColaborador,
                        },
                      }))
                    }
                  />

                  <CampoSelecionarCadastro
                    label={"Equipamento"}
                    itens={itens.equipamentos}
                    valorSelecionado={valoresEditados[evento.id]?.equipamento}
                    onChange={(selectedEquipamento) =>
                      setValoresEditados((prevValoresEditados) => ({
                        ...prevValoresEditados,
                        [evento.id]: {
                          ...prevValoresEditados[evento.id],
                          equipamento: selectedEquipamento,
                        },
                      }))
                    }
                  />
                </div>

                <div className="eventos__evento__modo-edicao__observacao">
                  <CampoTextoCadastro
                    label={"Observação"}
                    placeholder={"Atualize a observação do evento"}
                    size="small"
                    value={valoresEditados[evento.id]?.observacao || ""}
                    onChange={(e) =>
                      mudandoCampo(evento.id, "observacao", e.target.value)
                    }
                    error={
                      valoresEditados[evento.id] &&
                      (valoresEditados[evento.id]?.observacao.length < 5 ||
                        valoresEditados[evento.id]?.observacao.trim() === "")
                    }
                    textoDeAjuda={
                      valoresEditados[evento.id] &&
                      (valoresEditados[evento.id]?.observacao.length < 5 ||
                        valoresEditados[evento.id]?.observacao.trim() === "")
                        ? "A observação deve ter pelo menos 5 caracteres!"
                        : ""
                    }
                  />
                </div>

                <Botao
                  texto={"Salvar"}
                  onClick={() => salvarEdicao(evento)}
                  style={{
                    fontSize: "12px",
                    marginTop: "0px !important",
                    backgroundColor: Variaveis.corVerde,
                    "&:hover": {
                      backgroundColor: Variaveis.corVerdeEscura,
                    },
                  }}
                />
              </div>
            </BlocoEvento>
          ) : (
            <BlocoEvento>
              <div className="eventos__evento">
                <div className="eventos__evento__titulo">
                  <h1>{evento.titulo}</h1>
                </div>
                <div className="eventos__evento__data__inicio">
                  <h4>Data Início:</h4>
                  <p>{dataFormatada(evento.dataInicio)}</p>
                </div>
                <div className="eventos__evento__data__termino">
                  <h4>Data Término:</h4>
                  <p>{dataFormatada(evento.dataTermino)}</p>
                </div>
                <div className="eventos__evento__local">
                  <h4>Local:</h4>
                  <p>
                    {evento.local?.nome ?? "N/A"} -{" "}
                    {evento.local?.observacao ?? "N/A"}
                  </p>
                </div>
                <div className="eventos__evento__colaborador">
                  <h4>Colaborador:</h4>
                  <p>
                    {evento.colaborador?.nome ?? "N/A"} -{" "}
                    {evento.colaborador?.tipoColaborador ?? "N/A"}
                  </p>
                </div>
                <div className="eventos__evento__equipamento">
                  <h4>Equipamento:</h4>
                  <p>
                    {evento.equipamento?.descricao ?? "N/A"} -{" "}
                    {evento.equipamento?.observacao ?? "N/A"}
                  </p>
                </div>
                <div className="eventos__evento__observacao">
                  <h4>Observação:</h4>
                  <p>{evento.observacao}</p>
                </div>
              </div>
              <div className="eventos__evento__botoes">
                <Botao
                  corDeFundo={Variaveis.corVerde}
                  corDeFundoHover={Variaveis.corVerdeEscura}
                  texto={"Editar"}
                  onClick={() => toggleModoEdicao(evento.id)}
                />
                <Botao
                  corDeFundo={Variaveis.corVermelha}
                  corDeFundoHover={Variaveis.corVermelhaEscura}
                  texto={`Excluir`}
                  onClick={() => abrirExclusao(evento)}
                />
              </div>
              <Dialogo
                open={exclusaoDialogOpen}
                onClose={() => setExclusaoDialogOpen(false)}
                titulo={"Tem certeza que deseja excluir o evento?"}
                mensagem={
                  "Você não poderá recuperá-lo, a menos que faça um novo cadastro com as mesmas informações"
                }
                onConfirm={() => confirmarExclusao(evento)}
                itemParaDeletar={evento}
              />
            </BlocoEvento>
          )}
        </li>
      ))}
      <SnackBar
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        tipoMensagem={tipoSnackBar}
        mensagem={mensagemSnackBar}
      />
    </>
  );
};

export default Evento;
