import "../styles/WhyDevStyles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function WhyDevProfile() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <section className="why-section">
            <div className="why-container">
                <div className="section-header">
                    <h2>
                        Build Professional Resumes
                        <span className="highlight"> Faster Than Ever</span>
                    </h2>

                    <p>
                        DevProfile helps students, developers and professionals
                        create modern resumes, customize templates and export
                        ATS-friendly PDFs in just a few clicks.
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-file-circle-check"></i>
                        </div>
                        <h3>ATS Friendly</h3>
                        <p>
                            Optimized to pass recruiter screening systems with intelligent keyword matching.
                        </p>
                        <div className="feature-link" onClick={() => navigate(user ? "/dashboard" : "/login")}>
                            <span>Learn more</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-file-pdf"></i>
                        </div>
                        <h3>PDF Export</h3>
                        <p>
                            Download your CV in professional PDF format with one click.
                        </p>
                        <div className="feature-link" onClick={() => navigate(user ? "/dashboard" : "/login")}>
                            <span>Learn more</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <h3>Smart Analytics</h3>
                        <p>
                            Get insights on how to improve your CV based on industry standards.
                        </p>
                        <div className="feature-link" onClick={() => navigate(user ? "/dashboard" : "/login")}>
                            <span>Learn more</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyDevProfile;