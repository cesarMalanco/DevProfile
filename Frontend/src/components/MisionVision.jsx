import "../styles/AboutStyles.css";

function MissionVision() {
    return (
        <section className="mission-section">
            <div className="mission-header">
                <h2>
                    Mission &
                    <span> Vision</span>
                </h2>
                <p>
                    The principles that guide DevProfile and shape
                    our vision for the future of professional resume creation.
                </p>
            </div>

            <div className="mission-container">

                <div className="purpose-card mission-card">

                    <div className="purpose-header">
                        <div className="purpose-icon">
                        <i className="fa-solid fa-bullseye"></i>
                    </div>
                    <h3>Our Mission</h3>
                    </div>
                    <p>
                        To provide students, developers and professionals
                        with a simple and modern platform to create
                        high-quality resumes that showcase their skills,
                        achievements and potential.
                    </p>

                </div>

                <div className="purpose-center">
                    <div className="purpose-header">
                        
                    </div>
                    <div className="center-circle">
                        <i className="fa-solid fa-rocket"></i>
                    </div>

                </div>

                <div className="purpose-card vision-card">
                    <div className="purpose-header">
                        <div className="purpose-icon">
                            <i className="fa-solid fa-eye"></i>
                        </div>
                        <h3>Our Vision</h3>
                    </div>
                    <p>
                        To become a trusted platform that helps users
                        build stronger professional identities through
                        accessible design, technology and innovation.
                    </p>

                </div>

            </div>

        </section>
    );
}

export default MissionVision;