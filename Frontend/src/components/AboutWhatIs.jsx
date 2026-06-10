import "../styles/AboutStyles.css";
import cvImage from "../assets/cv4.png";

function WhatIsDevProfile() {
    return (
        <section className="what-is-section">

            <div className="what-is-image">
                <img
                    src={cvImage}
                    alt="DevProfile CV"
                />
            </div>

            <div className="what-is-content">

                <span className="section-tag">
                    Our Project
                </span>

                <h2>
                    What Is
                    <span> DevProfile?</span>
                </h2>

                <p>
                    DevProfile is a web application designed to help users
                    create professional resumes quickly and efficiently.
                    Through an intuitive editor, customizable templates,
                    and PDF export capabilities, users can build resumes
                    that stand out in today's competitive job market.
                </p>

                <p>
                    Our goal is to simplify resume creation while maintaining
                    a modern design and professional appearance.
                </p>

                <div className="features-list">

                    <div className="feature">
                        <i className="fa-solid fa-check"></i>
                        Fast Resume Creation
                    </div>

                    <div className="feature">
                        <i className="fa-solid fa-check"></i>
                        Modern Templates
                    </div>

                    <div className="feature">
                        <i className="fa-solid fa-check"></i>
                        ATS Friendly PDFs
                    </div>

                    <div className="feature">
                        <i className="fa-solid fa-check"></i>
                        Easy Customization
                    </div>

                </div>

            </div>

        </section>
    );
}

export default WhatIsDevProfile;