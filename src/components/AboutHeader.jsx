import "../styles/AboutStyles.css";
import cv5 from "../assets/cv5.png";
import cv6 from "../assets/cv6.png";
import cv7 from "../assets/cv7.png";
import cv8 from "../assets/cv8.png";

function AboutHeader() {
    return (
        <section className="about-hero">
            <div className="about-hero-content">
                <h1>
                    Building Professional
                    <span> Digital Profiles</span>
                </h1>

                <p>
                    DevProfile helps students, developers,
                    and professionals create modern resumes
                    with ease. Design, customize and export
                    professional CVs in minutes.
                </p>

            </div>

            <div className="about-gallery">

                <div className="about-card">
                    <img src={cv5} alt="CV Template" />
                </div>

                <div className="about-card">
                    <img src={cv6} alt="CV Template" />
                </div>

                <div className="about-card">
                    <img src={cv7} alt="CV Template" />
                </div>

                <div className="about-card">
                    <img src={cv8} alt="CV Template" />
                </div>

            </div>

        </section>
    );
}

export default AboutHeader;