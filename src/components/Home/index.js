import Evento from "../Evento";
import TextosCadastro from "../TextosCadastro";
import "./Home.css";

const Home = () => {
  return (
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
};

export default Home;
