import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import api from "../../services/api";
import { setItem, getItem } from "../../utils/storage";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      navigate("/main");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!email || !senha) {
        console.log("Preencha todos os campos!");
        return;
      }

      const response = await api.post("/login", { email, senha });

      const { token } = response.data;
      setItem("token", token);

      navigate("/main");
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div className="container">
      <form className="form-sign-in" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button className="btn-purple">Login</button>
      </form>
    </div>
  );
}

export default SignIn;
