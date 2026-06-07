import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/NavbarStyles.css";
import "../../src/index.css";
import logo from "../assets/devProfile_logo.png";
import { users } from "../data/users";

function Navbar() {
    const navigate = useNavigate();

    const [showLogin, setShowLogin] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const user = localStorage.getItem("loggedUser");

    const handleLogin = (e) => {
        e.preventDefault();

        const foundUser = users.find(
            (u) =>
                u.username === username &&
                u.password === password
        );

        if (!foundUser) {
            setError("Usuario o contraseña incorrectos");
            return;
        }

        localStorage.setItem(
            "loggedUser",
            foundUser.username
        );

        setShowLogin(false);

        setUsername("");
        setPassword("");
        setError("");

        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.removeItem("loggedUser");
        navigate("/");
        window.location.reload();
    };

    return (
        <>
            <div className="top-navbar">
                <div className="top-left">
                    <span>
                        <i className="fa-solid fa-phone"></i>
                        +52 449 123 4567
                    </span>

                    <span>
                        <i className="fa-solid fa-envelope"></i>
                        contacto@devprofile.com
                    </span>
                </div>

                <div className="top-right user-section">

                    {user ? (
                        <>
                            <span className="user-badge">
                                👤 {user}
                            </span>

                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                <i className="fa-solid fa-right-from-bracket"></i>
                                Salir
                            </button>
                        </>
                    ) : (
                        <button
                            className="login-link"
                            onClick={() => setShowLogin(true)}
                        >
                            <i className="fa-regular fa-user"></i>
                            Iniciar Sesión
                        </button>
                    )}

                </div>
            </div>

            <div className="logo-section">
                <h1 className="logo-title">
                    <span className="logo-dev">
                        Dev
                    </span>

                    <div className="logo-circle">
                        <img
                            src={logo}
                            alt="DevProfile Logo"
                        />
                    </div>

                    <span className="logo-profile">
                        Profile
                    </span>
                </h1>

                <p className="slogan">
                    Crea CVs profesionales en minutos
                </p>
            </div>

            <nav className="navbar">
                <ul className="nav-links">
                    <li><NavLink to="/">HOME</NavLink></li>

                    <li><NavLink to="/cvs">CV'S</NavLink></li>

                    <li><NavLink to="/editor">EDITOR</NavLink></li>

                    <li><NavLink to="/preview">PREVIEW</NavLink></li>

                    <li><NavLink to="/dashboard">DASHBOARD</NavLink></li>

                    <li><NavLink to="/about">ABOUT</NavLink></li>
                </ul>
            </nav>

            {/* MODAL LOGIN */}
            {showLogin && (
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

                            <p style={{ color: "red" }}>
                                {error}
                            </p>

                            <button type="submit">
                                Entrar
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowLogin(false)
                                }
                            >
                                Cancelar
                            </button>

                        </form>

                    </div>

                </div>
            )}
        </>
    );
}

export default Navbar;