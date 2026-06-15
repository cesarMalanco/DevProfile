import "../styles/PagesPreview.css";

function PageOne({ cvData, templateId }) {
    const fullName = cvData?.profile?.nombre_completo || "";
    const parts = fullName.trim().split(" ");

    const lastName = parts.length > 1 ? parts.pop() : "";
    const firstNames = parts.join(" ");

    return (
        <div className={`resume-page template-design-${templateId || 1}`}>
            <aside className="resume-sidebar">
                {cvData.profile?.foto_perfil && (
                    <img
                        className="sidebar-photo"
                        src={cvData.profile.foto_perfil}
                        alt="Profile"
                    />
                )}

                <div className="sidebar-section">
                    <div className="sidebar-section">
                        <h3 className="sidebar-title">
                            CONTACT
                        </h3>
                        <p className="sidebar-text">
                            <i className="fa-solid fa-phone"></i> {cvData.profile?.telefono}
                        </p>

                        <p className="sidebar-text">
                            <i className="fa-solid fa-envelope"></i> {cvData.profile?.correo}
                        </p>

                        <p className="sidebar-text">
                            <i className="fa-solid fa-location-dot"></i> {cvData.profile?.ciudad}
                        </p>

                        <p className="sidebar-text">
                            <i className="fa-brands fa-linkedin"></i> {cvData.profile?.linkedin}
                        </p>

                        <p className="sidebar-text">
                            <i className="fa-brands fa-github"></i> {cvData.profile?.github}
                        </p>

                        <p className="sidebar-text">
                            <i className="fa-solid fa-globe"></i> {cvData.profile?.portafolio}
                        </p>
                    </div>
                    <hr className="sidebar-divider" />
                    <div className="sidebar-section">
                        <h3 className="sidebar-title">
                            EDUCATION
                        </h3>
                        {cvData.education?.map((item, index) => (
                            <div key={index} className="sidebar-item" >
                                <strong>{item.institucion}</strong>
                                <p>{item.programa}</p>
                                <small>{item.periodo}</small>
                            </div>
                        ))}

                    </div>
                    <hr className="sidebar-divider" />
                    <div className="sidebar-section">
                        <h3 className="sidebar-title">
                            SKILLS
                        </h3>

                        {cvData.skills?.map((skill, index) => (
                            <div key={index} className="sidebar-item">
                                • {skill.nombre}
                                {skill.nivel && ` - ${skill.nivel}`}
                            </div>
                        ))}

                    </div>
                    <hr className="sidebar-divider" />
                    <div className="sidebar-section">
                        <h3 className="sidebar-title">
                            LANGUAGES
                        </h3>
                        {cvData.languages?.map((language, index) => (
                            <div key={index} className="sidebar-item">
                                • {language.idioma}
                                {language.nivel &&` - ${language.nivel}`}
                            </div>
                        ))}
                    </div>

                </div>
            </aside>

            <main className="resume-content">
                <div className="resume-header">
                    <h1 className="resume-first-name">
                        {firstNames}
                    </h1>
                    <h1 className="resume-last-name">
                        {lastName}
                    </h1>
                    <div className="resume-profession">
                        {cvData.profile?.profesion}
                    </div>
                </div>

                <div className="content-section">
                    <h2 className="content-title">
                        Professional Summary
                    </h2>
                    <p className="description-text">
                        {cvData.profile?.descripcion}
                    </p>
                </div>

                <div className="content-section">
                    <h2 className="content-title">
                        Education
                    </h2>
                    {cvData.education?.map((item, index) => (
                        <div key={index} className="education-item">
                            <h4>
                                {item.institucion}
                            </h4>
                            <p>
                                {item.programa}
                            </p>
                            {item.descripcion && (
                                <p>
                                    {item.descripcion}
                                </p>
                            )}
                            <p>
                                {item.evidencia}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="content-section">
                    <h2 className="content-title">
                        Skills
                    </h2>
                    {cvData.skills?.map((skill, index) => (
                        <div key={index} className="skill-item">
                            <h4>
                                {skill.nombre}{" - "}{skill.nivel}
                            </h4>
                            <p>
                                {skill.descripcion}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="content-section">
                    <h2 className="content-title">
                        Languages
                    </h2>
                    {cvData.languages?.map((language, index) => (
                        <div key={index} className="language-item">
                            <h4>
                                {language.idioma}{" - "}{language.nivel}
                            </h4>
                            <p>
                                {language.descripcion}
                            </p>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}

export default PageOne;
