import cv1 from "../assets/cv2.png";
import cv2 from "../assets/cv1.png";
import cv3 from "../assets/cv3.png";
import "../../src/index.css";
import "../styles/HeroStyles.css";
import "../styles/globalStyles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Hero() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <section className="hero">
            <div className="hero-left">
                <span className="hero-tag">
                    Build Your Professional Future
                </span>

                <h1 className="hero-title"> Create CVs That <br /> Showcase Your <br />
                    <span className="highlight"> Talent</span>
                </h1>

                <p className="hero-description">
                    Design professional resumes, customize templates,
                    and export ATS-friendly PDFs in minutes.
                    Everything you need to stand out in your next opportunity.
                </p>

                <div className="hero-buttons">
                    <button className="btn-primary" onClick={() => navigate(user?"/editor":"/login")}>
                        Create CV
                    </button>

                    <button className="btn-secondary" onClick={() => navigate(user ? "/dashboard" : "/login")}>
                        Explore your stadistics
                    </button>
                </div>

                <div className="hero-stats">
                    <div>
                        <h2>10K+</h2>
                        <span>CVs Generated</span>
                    </div>

                    <div>
                        <h2>500+</h2>
                        <span>Templates Used</span>
                    </div>

                    <div>
                        <h2>95%</h2>
                        <span>User Satisfaction</span>
                    </div>
                </div>

            </div>

            <div className="hero-right">

                <div className="cv-card cv-left">
                    <img src={cv1} alt="CV Template 1" />
                </div>

                <div className="cv-card cv-center">
                    <img src={cv2} alt="CV Template 2" />
                </div>

                <div className="cv-card cv-right">
                    <img src={cv3} alt="CV Template 3" />
                </div>

            </div>

        </section>
    );
}

export default Hero;