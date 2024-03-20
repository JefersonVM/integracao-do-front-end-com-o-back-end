import "./styles.css";
import api from "../../services/api";
import React, { useEffect, useState } from "react";

function Main() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [currentDetailUser, setCurrentDetailUser] = useState(null);
  async function loadUsers() {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function deleteUser(id) {
    try {
      await api.delete(`/users/${id}`).then((response) => {
        console.log("response: ", response);
        loadUsers();
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }

  function handleChangeInputValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (form.name === "" || form.email === "" || form.password === "") {
        return;
      }

      await api.post("/users", form).then((response) => {
        console.log("response: ", response);
        loadUsers();
      });
    } catch (error) {
      console.log("error: ", error);
    }

    setForm({
      name: "",
      email: "",
      password: "",
    });
  }

  async function handleUpdateUser(id) {
    try {
      if (form.name === "" || form.email === "" || form.password === "") {
        return;
      }

      await api.put(`/users/${currentUser.id}`, form).then((response) => {
        console.log("response: ", response);
        loadUsers();
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function handleSelectCurrentUser(user) {
    setCurrentUser(user);
    setForm({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  async function handleDetailUser(user) {
    setCurrentDetailUser(user);
  }

  async function handleClearForm() {
    setForm({
      name: "",
      email: "",
      password: "",
    });
  }

  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <div className="container-main">
      <form
        className="square"
        onSubmit={() => {
          handleSubmit();
        }}
      >
        <h1>Adicionar Usuário</h1>
        <input
          name="name"
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={handleChangeInputValue}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChangeInputValue}
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChangeInputValue}
        />
        <button onClick={handleSubmit}>Adicionar</button>
        <button onClick={() => handleUpdateUser()}>Atualizar</button>
        <button onClick={() => handleClearForm()}>Limpar</button>
      </form>
      <div className="container-lista">
        <h1>Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <div className="buttons">
                <button onClick={() => deleteUser(user.id)}>Deletar</button>
                <button onClick={() => handleSelectCurrentUser(user)}>
                  Editar
                </button>
                <button onClick={() => handleDetailUser(user)}>Detalhar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="square container-detalhes-usuario">
        <h1>Usuário Selecionado</h1>
        <p>Nome: {currentDetailUser?.name}</p>
        <p>Email: {currentDetailUser?.email}</p>
        <p>Senha: {currentDetailUser?.password}</p>
      </div>
    </div>
  );
}

export default Main;

// Path: front-react-integracao-backend-codigo-base/base-01/src/pages/Main/styles.css
