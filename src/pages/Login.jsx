import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../data/users";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
      setError("Usuario o contraseña incorrectos");
      return;
    }

    localStorage.setItem(
      "loggedUser",
      username
    );

    navigate("/editor");
  };

  return (
    <div className="modal-overlay">

      <div className="login-modal">

        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <p style={{ color: "#ef4444" }}>
            {error}
          </p>

          <button type="submit">
            Entrar
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;