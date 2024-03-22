import { useState, useEffect } from "react";
import { getItem } from "../../utils/storage";
import api from "../../services/api";
import "./styles.css";

const Card = () => {
  const [contatos, setContatos] = useState([]);

  const handleListarContatos = async () => {
    const token = getItem("token");
    try {
      const response = await api.get("/contatos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContatos(response.data);
    } catch (error) {
      console.log("Erro ao listar contatos!");
    }
  };

  useEffect(() => {
    handleListarContatos();
  }, []);
  return (
    <div className="container-card">
      <h2>Lista de contatos</h2>

      {contatos.map((contato) => (
        <div key={contato.id} className="contato">
          <ul>
            <li>Nome: {contato.nome}</li>
            <li>Telefone: {contato.telefone}</li>
            <li>Email: {contato.email}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Card;
