// Crie um novo arquivo chamado Contexto.js
import React, { createContext, useState, useEffect, useContext } from "react";

const ContextoAgenda = createContext();

const ContextoProvider = ({ children }) => {
  const [colaboradores, setColaboradores] = useState([]);
  const [locais, setLocais] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [itens, setItens] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [mensagemSnackBar, setMensagemSnackBar] = useState("");
  const [tipoSnackBar, setTipoSnackBar] = useState("success");

  useEffect(() => {
    fetchColaboradores();
    fetchLocais();
    fetchEquipamentos();
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

  const fetchColaboradores = () => {
    fetch("http://localhost:8080/colaboradores")
      .then((response) => response.json())
      .then((data) => {
        setColaboradores(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar colaboradores:", error);
      });
  };

  const fetchLocais = () => {
    fetch("http://localhost:8080/locais")
      .then((response) => response.json())
      .then((data) => {
        setLocais(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar locais:", error);
      });
  };

  const fetchEquipamentos = () => {
    fetch("http://localhost:8080/equipamentos")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEquipamentos(data);
        } else {
          console.error(
            "Erro ao buscar equipamentos: formato de data inválido"
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar equipamentos:", error);
      });
  };

  const value = {
    eventos,
    setEventos,
    fetchEventos,
    fetchItens,
    itens,
    colaboradores,
    locais,
    equipamentos,
    fetchColaboradores,
    fetchLocais,
    fetchEquipamentos,
    // Other state variables or functions you want to expose
  };

  return (
    <ContextoAgenda.Provider
      value={value}
    >
      {children}
    </ContextoAgenda.Provider>
  );
};

export const useContextoAgenda = () => useContext(ContextoAgenda);

export default ContextoProvider;
