import { useState } from "react";
import "./styles.css";
import api from "../../services/api";
import { getItem } from "../../utils/storage";

function Main() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const token = getItem("token");
    const data = {
      nome,
      telefone,
      email,
    };
    try {
      await api.post("/contatos", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNome("");
      setTelefone("");
      setEmail("");
      console.log("Contato cadastrado com sucesso!");
    } catch (error) {
      console.log("Erro ao cadastrar contato!");
    }
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "nome") {
      setNome(value);
    } else if (name === "telefone") {
      setTelefone(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  return (
    <div className="container">
      <form className="form-profile" onSubmit={handleSubmit}>
        <h2>Contatos</h2>
        <input
          name="nome"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={handleChangeInput}
          required
        />
        <input
          name="telefone"
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={handleChangeInput}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeInput}
          required
        />
        <button className="btn-purple">Adicionar</button>
      </form>
      <div className="container-contatos">
        <h2>Lista de contatos</h2>
      
   
          

      </div>
    </div>
  );
}

export default Main;
