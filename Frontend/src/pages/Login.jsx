import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/LoginStyles.css"
import img1 from "../assets/login-img.png";

function Login() {
    const navigate = useNavigate();
    const { login: authLogin }  = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const data = await loginUser({
                    email: formData.email,
                    password: formData.password
                });
                
                if (!data.token) {
                    alert(data.message);
                    return;
                }
                authLogin(data.usuario, data.token);
                navigate("/");

            } else {
                const data = await registerUser(formData);
                alert(data.message);
                setIsLogin(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">

                <div className="auth-left-image">
                    <img src={img1} alt="Login illustration" className="auth-image"/>
                </div>

                <div className="auth-form-wrapper">
                    <div className={`form-container ${isLogin ? "login" : "register"}`}>
                        <div className="form-header">
                            <h3>
                                {isLogin ? (
                                    <>
                                        <span className="first-word">Welcome</span>
                                        <span className="second-word">back!</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="first-word">Create</span>
                                        <span className="second-word">account</span>
                                    </>
                                )}
                            </h3>
                            <p>{isLogin ? "Sign in to continue" : "Start building your CV today"}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">

                            {!isLogin && (
                                <input type="text" name="nombre" placeholder="Full name" onChange={handleChange} className="auth-input"/>
                            )}
                            <input type="email" name="email" placeholder="Email address" onChange={handleChange} className="auth-input"/>
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} className="auth-input"/>

                            <button className="auth-button" type="submit">
                                {isLogin ? "Sign in" : "Create account"}
                            </button>

                        </form>
                        <div className="auth-switch">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <span onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Sign up" : "Sign in"}
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );

}

export default Login;