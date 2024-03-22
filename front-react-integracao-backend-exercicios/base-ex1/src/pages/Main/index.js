import { useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";

function Main() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name || !form.email) {
        return;
      }

      await api.post("/users", form).then((response) => {
        setForm({
          name: "",
          email: "",
        });
        loadUsers();
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container">
      <form className="container-form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button>Cadastrar</button>
      </form>
      <div className="container-users">
        <h2>Users</h2>
        {users.map((user) => (
          <div key={user.id} className="user">
            <p>
              <strong>Nome:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
