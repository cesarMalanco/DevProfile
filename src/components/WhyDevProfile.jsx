import "../styles/WhyDevStyles.css";

function WhyDevProfile() {
    return (
        <section className="about-section">
            <div className="section-header">
                <span className="section-tag">
                    ABOUT DEVPROFILE
                </span>

                <h2>
                    Build Professional Resumes
                    <span> Faster Than Ever</span>
                </h2>

                <p>
                    DevProfile helps students, developers and professionals
                    create modern resumes, customize templates and export
                    ATS-friendly PDFs in just a few clicks.
                </p>
            </div>

            <div className="about-grid">
                <div className="feature-card">
                    <i className="fa-solid fa-file-circle-check"></i>
                    <h3>ATS Friendly</h3>
                    <p>
                        Optimized to pass recruiter screening systems.
                    </p>
                </div>

                <div className="feature-card featured">
                    <h3>Why Choose DevProfile?</h3>
                    <p>
                        Create beautiful resumes with modern templates,
                        organize multiple versions and export them instantly.
                    </p>
                </div>

                <div className="feature-card">
                    <i className="fa-solid fa-file-pdf"></i>
                    <h3>PDF Export</h3>
                    <p>
                        Download your CV in professional PDF format.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default WhyDevProfile;