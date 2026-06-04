import { NavLink } from "react-router";
import "../styles/NavbarStyles.css";    
import "../../src/index.css";
import logo from "../assets/devProfile_logo.png";

function Navbar() {
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

                <div className="top-right">
                    <NavLink to="/login" className="login-link">
                        <i className="fa-regular fa-user"></i>
                        Iniciar Sesión
                    </NavLink>
                </div>
            </div>


            <div className="logo-section">
                <h1 className="logo-title">
                    <span className="logo-dev">
                        Dev
                    </span>

                    <div className="logo-circle">
                        <img src={logo} alt="DevProfile Logo" />
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
                    <li>
                        <NavLink to="/">HOME</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cvs">CV'S</NavLink>
                    </li>
                    <li>
                        <NavLink to="/editor">EDITOR</NavLink>
                    </li>
                    <li>
                        <NavLink to="/preview">PREVIEW</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard">DASHBOARD</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">ABOUT</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;