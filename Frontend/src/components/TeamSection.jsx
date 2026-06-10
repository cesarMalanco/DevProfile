import "../styles/AboutStyles.css";

function TeamSection() {
    return (
        <section className="team-section">

            <div className="team-header">
                <h2>
                    The Minds Behind
                    <span> DevProfile</span>
                </h2>

                <p>
                    A passionate team of developers working together
                    to create a modern and intuitive CV generation platform.
                </p>

            </div>

            <div className="team-grid">

                <div className="team-card">
                    <div className="member-avatar">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <h3>Danna Castro</h3>
                    <span>Frontend Developer</span>
                    <p>
                        Responsible for UI design, React components,
                        user experience and responsive layouts.
                    </p>
                </div>

                <div className="team-card">
                    <div className="member-avatar">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <h3>Vanessa Torres</h3>
                    <span>Backend Developer</span>
                    <p>
                        Handles APIs, database integration and
                        application logic.
                    </p>
                </div>

                <div className="team-card">
                    <div className="member-avatar">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <h3>Isabel Alvarado</h3>
                    <span>UI/UX Designer</span>
                    <p>
                        Focused on creating intuitive interfaces
                        and visual consistency.
                    </p>
                </div>

                <div className="team-card">
                    <div className="member-avatar">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <h3>César Malanco</h3>
                    <span>Project Manager</span>
                    <p>
                        Coordinates development tasks and ensures
                        project objectives are achieved.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default TeamSection;