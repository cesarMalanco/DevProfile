import { NavLink, useNavigate } from "react-router-dom";
import "../styles/NavbarStyles.css";
import "../../src/index.css";
import logo from "../assets/devProfile_logo.png";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useTheme();

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
                                <i className="fa-regular fa-user"></i> {user?.nombre}
                            </span>

                            <button className="logout-btn" onClick={logout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                Logout
                            </button>
                        </>
                    ) : (
                        <button className="login-link" onClick={() => navigate("/login")}>
                            <i className="fa-regular fa-user"></i>
                            Iniciar Sesión
                        </button>
                    )}
                    <button
                        className="theme-btn"
                        onClick={toggleTheme}
                        aria-label="Cambiar tema claro/oscuro"
                    >
                    </button>
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
                    Create professional CVs in minutes
                </p>
            </div>

            <nav className="navbar">
                <ul className="nav-links">
                    <li><NavLink to="/">HOME</NavLink></li>
                    <li><NavLink to="/cvs">CV'S</NavLink></li>
                    {user && (
                        <>
                            <li><NavLink to="/editor">EDITOR</NavLink></li>
                            <li><NavLink to="/dashboard">DASHBOARD</NavLink></li>
                        </>
                    )}
                    <li><NavLink to="/about">ABOUT</NavLink></li>
                </ul>
            </nav>
            
        </>
    );
};

export default Navbar;