import "../styles/BenefitsStyles.css";
import cv1 from "../assets/cv4.png";

function Benefits() {

    return (
        <section className="benefits-section">

            <div className="benefits-bg-decoration">
                <div className="bg-blur bg-blur-1"></div>
                <div className="bg-blur bg-blur-2"></div>
            </div>

            <div className="benefits-header">
                <h2>
                    More Than Just a
                    <span> CV Builder</span>
                </h2>

                <p>
                    Everything you need to create professional resumes
                    that stand out from the crowd.
                </p>
            </div>

            <div className="benefits-showcase">

                <div className="benefit top-left-Benefit">
                    <div className="benefit-top">
                        <i className="fa-solid fa-bolt"></i>
                        <h3>Lightning Fast</h3>
                    </div>
                    <p>Create your CV in minutes.</p>
                </div>

                <div className="benefit top-right">
                    <div className="benefit-top">
                        <i className="fa-solid fa-mobile-screen"></i>
                        <h3>Mobile Responsive</h3>
                    </div>
                    <p>Edit from any device.</p>
                </div>

                <div className="benefit middle-left">
                    <div className="benefit-top">
                        <i className="fa-solid fa-cloud"></i>
                        <h3>Cloud Storage</h3>
                    </div>
                    <p>Access your files anywhere.</p>
                </div>

                <div className="cv-preview">
                    <img
                        src={cv1} alt="CV Preview"
                    />
                </div>

                <div className="benefit middle-right">
                    <div className="benefit-top">
                        <i className="fa-solid fa-shield-halved"></i>
                        <h3>Privacy First</h3>
                    </div>
                    <p>Your information stays secure.</p>
                </div>

                <div className="benefit bottom-left">
                    <div className="benefit-top">
                        <i className="fa-solid fa-palette"></i>
                        <h3>Custom Designs</h3>
                    </div>
                    <p>Personalize colors and layouts.</p>
                </div>

                <div className="benefit bottom-right">
                    <div className="benefit-top">
                        <i className="fa-solid fa-chart-line"></i>
                        <h3>See your skills in action</h3>
                    </div>
                    <p>Watch your skills come alive in interactive graphics.</p>
                </div>

            </div>

        </section>
    );
}

export default Benefits;