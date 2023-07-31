import React, { useEffect, useState } from "react";
import Variaveis from "../../assets/variaveis/variaveis";
import BlocoCadastro from "../BlocoCadastro";
import Botao from "../Botao";
import CampoTextoCadastro from "../CampoTextoCadastro";
import TextosCadastro from "../TextosCadastro";
import Dialogo from "../Dialogo";
import SnackBar from "../SnackBar";

const LogicaCadastros = ({
  entidadeMaiuscula,
  entidadeMinuscula,
  entidadePluralMinuscula,
  subtituloEspecifico,
  subtituloEspecificoLista,
  labelCampo1,
  labelCampo2,
  placeHolderCampo1,
  placeHolderCampo2,
  campo1,
  campo2,
  fields,
}) => {
  const [descricao, setDescricao] = useState("");
  const [observacao, setObservacao] = useState("");
  const [tipoColaborador, setTipoColaborador] = useState("");
  const [itens, setItens] = useState([]);
  const [modoEdicao, setModoEdicao] = useState({});
  const [valoresEditados, setValoresEditados] = useState({});
  const [mostrarLista, setMostrarLista] = useState(false);
  const [itemParaDeletar, setItemParaDeletar] = useState(null);
  const [exclusaoDialogOpen, setExclusaoDialogOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [mensagemSnackBar, setMensagemSnackBar] = useState("");
  const [tipoSnackBar, setTipoSnackBar] = useState("success");

  useEffect(() => {
    fetchItens();
  }, []);

  useEffect(() => {
    const initialValoresEditados = itens.reduce((valores, item) => {
      valores[item.id] = fields.reduce((fieldValues, field) => {
        fieldValues[field] = item[field] || "";
        return fieldValues;
      }, {});
      return valores;
    }, {});
    setValoresEditados(initialValoresEditados);
  }, [itens, fields]);

  const fetchItens = () => {
    fetch(`http://localhost:8080/${entidadePluralMinuscula}`)
      .then((response) => response.json())
      .then((data) => {
        setItens(data);
        setModoEdicao(
          data.reduce((modoEdicaoObj, item) => {
            modoEdicaoObj[item.id] = false;
            return modoEdicaoObj;
          }, {})
        );
      })
      .catch((error) => {
        setMensagemSnackBar("Ocorreu um erro:", error);
        setTipoSnackBar("error");
        setOpenSnackBar(true);
      });
  };

  const salvar = () => {
    let objetoJson = {};

    if (entidadePluralMinuscula === "colaboradores") {
      setTipoColaborador("");
      objetoJson = {
        nome: descricao,
        tipoColaborador: tipoColaborador,
      };
    } else if (entidadePluralMinuscula === "equipamentos") {
      objetoJson = {
        descricao: descricao,
        observacao: observacao,
      };
    } else {
      objetoJson = {
        nome: descricao,
        observacao: observacao,
      };
    }

    fetch(`http://localhost:8080/${entidadePluralMinuscula}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(objetoJson),
    })
      .then((res) => {
        if (res.ok) {
          setMensagemSnackBar(`${entidadeMaiuscula} salvo com sucesso!`);
          setTipoSnackBar("success");
          setOpenSnackBar(true);
          fetchItens();
          limpar();
        } else {
          setMensagemSnackBar(`Erro ao salvar ${entidadeMinuscula}!`);
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
    setDescricao("");
    setObservacao("");
  };

  const aoEnviarFormulario = (e) => {
    e.preventDefault();

    if (
      (descricao.length >= 3 && observacao.length >= 3) ||
      (descricao.length >= 3 && tipoColaborador.length >= 3)
    ) {
      salvar();
    } else {
      setMensagemSnackBar("Corrija os erros indicados na tela!");
      setTipoSnackBar("error");
      setOpenSnackBar(true);
    }
  };

  const validacaoPrimeiraLetraMaiuscula = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  const abrirModoEdicao = (id) => {
    setModoEdicao((prevModoEdicao) => ({
      ...prevModoEdicao,
      [id]: !prevModoEdicao[id],
    }));

    const currentItem = itens.find((item) => item.id === id);

    setValoresEditados((prevValoresEditados) => ({
      ...prevValoresEditados,
      [id]: fields.reduce((fieldValues, field) => {
        fieldValues[field] = currentItem?.[field] || "";
        return fieldValues;
      }, {}),
    }));
  };

  const salvarEdicao = (item) => {
    const itemEditado = valoresEditados[item.id] || {};
    let updateItem = {};

    fields.forEach((field) => {
      const editedValue = itemEditado[field];
      updateItem[field] =
        editedValue !== undefined && editedValue.trim() !== ""
          ? editedValue
          : "";
    });

    const hasInvalidFields = fields.some(
      (field) => !updateItem[field] || updateItem[field].length < 3
    );

    if (hasInvalidFields) {
      setMensagemSnackBar("Corrija os erros indicados na tela!");
      setTipoSnackBar("error");
      setOpenSnackBar(true);
      return;
    }

    fetch(`http://localhost:8080/${entidadePluralMinuscula}/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao atualizar o ${entidadeMinuscula}`);
        }
        return response.json();
      })
      .then((data) => {
        const expectedFields =
          entidadePluralMinuscula === "colaboradores"
            ? ["id", "nome", "tipoColaborador"]
            : entidadePluralMinuscula === "equipamentos"
            ? ["id", "descricao", "observacao"]
            : ["id", "nome", "observacao"];

        const fieldsKeys = Object.keys(data);
        const containsExpectedFields = expectedFields.every((field) =>
          fieldsKeys.includes(field)
        );

        if (
          typeof data === "object" &&
          data !== null &&
          containsExpectedFields
        ) {
          setMensagemSnackBar(`${entidadeMaiuscula} alterado com sucesso!`);
          setTipoSnackBar("success");
          setOpenSnackBar(true);

          setModoEdicao((prevModoEdicao) => ({
            ...prevModoEdicao,
            [item.id]: false,
          }));

          setItens((prevItens) =>
            prevItens.map((prevItem) =>
              prevItem.id === item.id ? data : prevItem
            )
          );
        } else {
          setMensagemSnackBar("A resposta da API não contém campos esperados");
          setTipoSnackBar("error");
          setOpenSnackBar(true);
        }
      })
      .catch((error) => {
        setMensagemSnackBar(
          `Ocorreu um erro ao salvar as alterações: ${error.message}`
        );
        setTipoSnackBar("error");
        setOpenSnackBar(true);
      });
  };

  const abrirExclusao = (item) => {
    setItemParaDeletar(item);
    setExclusaoDialogOpen(true);
  };

  const confirmarExclusao = (itemParaDeletar) => {
    if (itemParaDeletar) {
      fetch(
        `http://localhost:8080/${entidadePluralMinuscula}/${itemParaDeletar.id}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro ao excluir o ${entidadeMinuscula}`);
          }
          setMensagemSnackBar(`${entidadeMaiuscula} excluído com sucesso!`);
          setTipoSnackBar("success");
          setOpenSnackBar(true);
          setItens((prevItens) =>
            prevItens.filter((item) => item.id !== itemParaDeletar.id)
          );
          setExclusaoDialogOpen(false);
        })
        .catch((error) => {
          setMensagemSnackBar(
            `Ocorreu um erro ao excluir o ${entidadeMinuscula}: ` +
              error.message
          );
          setTipoSnackBar("error");
          setOpenSnackBar(true);
        });
    }
  };

  const mostrarItensCadastrados = () => {
    fetchItens();
    setMostrarLista(true);
  };

  return (
    <BlocoCadastro>
      {mostrarLista ? (
        <div>
          <TextosCadastro
            titulo={`Lista de ${entidadePluralMinuscula}`}
            subtitulo={subtituloEspecificoLista}
          />
          <ul className={`lista-${entidadePluralMinuscula}`}>
            {itens.map((item) => (
              <li key={item.id}>
                {modoEdicao[item.id] ? (
                  <div
                    className={`lista-${entidadePluralMinuscula}__${entidadeMinuscula}__modo-edicao`}
                  >
                    <div
                      className={`lista-${entidadePluralMinuscula}__${entidadeMinuscula}__inputs`}
                    >
                      {fields.map((field) => (
                        <div
                          key={field}
                          className={`lista-${entidadePluralMinuscula}__${entidadeMinuscula}__${field}`}
                        >
                          <CampoTextoCadastro
                            label={
                              field.charAt(0).toUpperCase() + field.slice(1)
                            }
                            value={valoresEditados[item.id]?.[field] || ""}
                            size="small"
                            onChange={(e) =>
                              setValoresEditados((prevValoresEditados) => ({
                                ...prevValoresEditados,
                                [item.id]: {
                                  ...prevValoresEditados[item.id],
                                  [field]: validacaoPrimeiraLetraMaiuscula(
                                    e.target.value
                                  ),
                                },
                              }))
                            }
                            error={
                              valoresEditados[item.id] &&
                              (valoresEditados[item.id][field]?.length < 3 ||
                                valoresEditados[item.id][field]?.trim() === "")
                            }
                            textoDeAjuda={
                              valoresEditados[item.id] &&
                              (valoresEditados[item.id][field]?.length < 3 ||
                                valoresEditados[item.id][field]?.trim() === "")
                                ? "O campo deve ter pelo menos 3 caracteres!"
                                : ""
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <Botao
                      texto={"Salvar"}
                      onClick={() => salvarEdicao(item)}
                      style={{
                        width: "60px",
                        height: "40px",
                        fontSize: "10px",
                        marginTop: "0px !important",
                        backgroundColor: Variaveis.corVerde,
                        "&:hover": {
                          backgroundColor: Variaveis.corVerdeEscura,
                        },
                      }}
                    ></Botao>
                    <SnackBar
                      open={openSnackBar}
                      onClose={() => setOpenSnackBar(false)}
                      tipoMensagem={tipoSnackBar}
                      mensagem={mensagemSnackBar}
                    />
                  </div>
                ) : (
                  <div
                    className={`lista-${entidadePluralMinuscula}__${entidadeMinuscula}`}
                  >
                    {fields.map((field, index) => (
                      <React.Fragment key={field}>
                        {item[field]}
                        {index < fields.length - 1 ? " - " : ""}
                      </React.Fragment>
                    ))}
                    <div
                      className={`lista-${entidadePluralMinuscula}__${entidadeMinuscula}__botoes`}
                    >
                      <Botao
                        texto={"Editar"}
                        onClick={() => abrirModoEdicao(item.id)}
                        style={{
                          width: "60px",
                          height: "40px",
                          fontSize: "10px",
                          marginTop: "0px !important",
                          backgroundColor: Variaveis.corVerde,
                          "&:hover": {
                            backgroundColor: Variaveis.corVerdeEscura,
                          },
                        }}
                      ></Botao>
                      <Botao
                        texto={"Excluir"}
                        onClick={() => abrirExclusao(item)}
                        style={{
                          width: "60px",
                          height: "40px",
                          fontSize: "10px",
                          marginTop: "0px !important",
                          backgroundColor: Variaveis.corVermelha,
                          "&:hover": {
                            backgroundColor: Variaveis.corVermelhaEscura,
                          },
                        }}
                      ></Botao>
                    </div>
                  </div>
                )}
                <Dialogo
                  open={exclusaoDialogOpen}
                  onClose={() => setExclusaoDialogOpen(false)}
                  titulo={`Tem certeza que deseja excluir o ${entidadeMinuscula}?`}
                  mensagem={
                    "Você não poderá recuperá-lo, a menos que faça um novo cadastro com as mesmas informações"
                  }
                  onConfirm={() => confirmarExclusao(itemParaDeletar)}
                  itemParaDeletar={itemParaDeletar}
                />
              </li>
            ))}
          </ul>
          <Botao
            texto={`Cadastrar ${entidadeMinuscula}`}
            onClick={() => setMostrarLista(false)}
            style={{
              backgroundColor: Variaveis.corLaranja,
              "&:hover": { backgroundColor: Variaveis.corLaranjaEscura },
              marginTop: "0px !important",
            }}
          />
          <SnackBar
            open={openSnackBar}
            onClose={() => setOpenSnackBar(false)}
            tipoMensagem={tipoSnackBar}
            mensagem={mensagemSnackBar}
          />
        </div>
      ) : (
        <div>
          <TextosCadastro
            titulo={`Cadastro de ${entidadeMaiuscula}`}
            subtitulo={subtituloEspecifico}
          />
          <form onSubmit={aoEnviarFormulario}>
            <div className="cadastro-box__campos">
              <CampoTextoCadastro
                id={"descricao"}
                label={labelCampo1}
                placeholder={placeHolderCampo1}
                value={descricao}
                onChange={(e) =>
                  setDescricao(validacaoPrimeiraLetraMaiuscula(e.target.value))
                }
                error={descricao && descricao.length < 3}
                textoDeAjuda={
                  descricao && descricao.length < 3
                    ? "O campo deve conter pelo menos 3 caracteres!"
                    : ""
                }
              />
              {entidadePluralMinuscula === "colaboradores" && (
                <CampoTextoCadastro
                  id={"tipoColaborador"}
                  label={labelCampo2}
                  placeholder={placeHolderCampo2}
                  value={tipoColaborador}
                  onChange={(e) =>
                    setTipoColaborador(
                      validacaoPrimeiraLetraMaiuscula(e.target.value)
                    )
                  }
                  error={tipoColaborador && tipoColaborador.length < 3}
                  textoDeAjuda={
                    tipoColaborador && tipoColaborador.length < 3
                      ? "O campo deve conter pelo menos 3 caracteres!"
                      : ""
                  }
                />
              )}
              {entidadePluralMinuscula !== "colaboradores" && (
                <CampoTextoCadastro
                  id={"observacao"}
                  label={labelCampo2}
                  placeholder={placeHolderCampo2}
                  value={observacao}
                  onChange={(e) =>
                    setObservacao(
                      validacaoPrimeiraLetraMaiuscula(e.target.value)
                    )
                  }
                  error={observacao && observacao.length < 3}
                  textoDeAjuda={
                    observacao && observacao.length < 3
                      ? "O campo deve conter pelo menos 3 caracteres!"
                      : ""
                  }
                />
              )}
            </div>
            <div className="cadastro-box__botoes">
              <Botao
                corDeFundo={Variaveis.corLaranja}
                corDeFundoHover={Variaveis.corLaranjaEscura}
                texto={"Salvar"}
                type="submit"
              />
              <Botao
                corDeFundo={Variaveis.corAzulClara}
                corDeFundoHover={Variaveis.corAzulMenosEscura}
                texto={`Visualizar ${entidadePluralMinuscula} cadastrados`}
                onClick={mostrarItensCadastrados}
              />
            </div>
          </form>
          <SnackBar
            open={openSnackBar}
            onClose={() => setOpenSnackBar(false)}
            tipoMensagem={tipoSnackBar}
            mensagem={mensagemSnackBar}
          />
        </div>
      )}
    </BlocoCadastro>
  );
};

export default LogicaCadastros;
