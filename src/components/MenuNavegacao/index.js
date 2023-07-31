import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "../../assets/img/home.svg";
import AgendaIcon from "../../assets/img/Agenda.svg";
import LocalIcon from "../../assets/img/local.svg";
import ColaboradorIcon from "../../assets/img/colaborador.svg";
import EquipamentoIcon from "../../assets/img/equipamentos.svg";
import Variaveis from "../../assets/variaveis/variaveis";
import './menuNavegacao.css';
import Home from "../Home";
import Local from "../Local";
import Colaborador from "../Colaborador";
import Equipamento from "../Equipamento";
import Agenda from "../Agenda";
import TextosCadastro from "../TextosCadastro";
import Evento from "../Evento";

const paginas = ["Home", "Agenda", "Local", "Colaborador", "Equipamento"];
const settings = ["Perfil", "Conta", "Sair"];

const MenuNavegacao = () => {
  const [navegacaoPerfil, setNavegacaoPerfil] = useState(null);
  const [ativo, setAtivo] = useState("Home");
  const [componenteAtual, setComponenteAtual] = useState("");
  const [exibirIcones, setExibirIcones] = useState(window.innerWidth < 500);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setComponenteAtual(
      <>
        <TextosCadastro
          titulo={"Eventos Senac"}
          subtitulo={"Todos os eventos cadastrados estão aqui!"}
        />
        <ul className="eventos">
          <Evento />
        </ul>
      </>
    );
  }, []);

  const atualizarExibicaoIcones = () => {
    setExibirIcones(window.innerWidth < 500);
  };

  useEffect(() => {
    window.addEventListener("resize", atualizarExibicaoIcones);
    return () => {
      window.removeEventListener("resize", atualizarExibicaoIcones);
    };
  }, []);

  const abrirNavegacaoPerfil = (event) => {
    setNavegacaoPerfil(event.currentTarget);
  };

  const fecharNavegacaoPerfil = () => {
    setNavegacaoPerfil(null);
  };

  const ficouAtivo = (pagina) => {
    setAtivo(pagina);
    if (pagina === "Home") {
      setComponenteAtual(<Home />);
    } else if (pagina === "Agenda") {
      setComponenteAtual(<Agenda />);
    } else if (pagina === "Local") {
      setComponenteAtual(<Local />);
    } else if (pagina === "Colaborador") {
      setComponenteAtual(<Colaborador />);
    } else if (pagina === "Equipamento") {
      setComponenteAtual(<Equipamento />);
    }
  };

  return (
    <AppBar
      position="static"
      className="menu-navegacao"
      style={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className="menu-navegacao__menu-principal">
          <img
            src="../img/logoTitleSenac.png"
            alt="logo Senac"
            className="menu-navegacao__imagem-senac"
          />
          {exibirIcones ? (
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                ficouAtivo(paginas[newValue]);
              }}
              className="menu-navegacao__box"
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: Variaveis.corAzulEscura,
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                zIndex: 9999999,
              }}
            >
              {paginas.map((pagina, index) => (
                <BottomNavigationAction
                  key={pagina}
                  label={pagina}
                  icon={
                    <img
                      src={
                        pagina === "Home"
                          ? HomeIcon
                          : pagina === "Agenda"
                          ? AgendaIcon
                          : pagina === "Local"
                          ? LocalIcon
                          : pagina === "Colaborador"
                          ? ColaboradorIcon
                          : pagina === "Equipamento"
                          ? EquipamentoIcon
                          : null
                      }
                      alt={pagina}
                      style={{ width: 24, height: 24, }}
                    />
                  }
                  sx={{
                    color: ativo === pagina ? "gray" : "#888",
                    fontFamily: "Quicksand",
                    paddingInline: 0,
                  }}
                />
              ))}
            </BottomNavigation>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                gap: 2,
                paddingLeft: 2,
              }}
              className="menu-navegacao__box"
            >
              {paginas.map((pagina) => (
                <Button
                  key={pagina}
                  onClick={() => ficouAtivo(pagina)}
                  className={ativo === pagina ? "ativo" : "naoAtivo"}
                  sx={{
                    my: 2,
                    color: "gray",
                    display: "block",
                    fontFamily: "Quicksand",
                  }}
                >
                  {pagina}
                </Button>
              ))}
            </Box>
          )}
          <Box
            sx={{
              flexGrow: 0,
            }}
          >
            <Tooltip title="Abrir menu">
              <IconButton
                onClick={abrirNavegacaoPerfil}
                sx={{ p: 0 }}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "5px",
              }}
              anchorEl={navegacaoPerfil}
              open={Boolean(navegacaoPerfil)}
              onClose={fecharNavegacaoPerfil}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={fecharNavegacaoPerfil}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        {componenteAtual}
      </Container>
    </AppBar>
  );
};

export default MenuNavegacao;
