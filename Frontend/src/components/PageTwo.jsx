import "../styles/PagesPreview.css";

function PageTwo({ cvData }) {
    return (
        <div className="resume-page">
            <aside className="resume-sidebar">

            </aside>
            <main className="resume-content">
                <div className="content-section">
                    <h2 className="content-title">
                        Projects
                    </h2>
                    {cvData.projects?.map((project, index) => (
                        <div key={index} className="project-item">

                            <h4>
                                {project.nombre}
                                {project.tecnologias && ` — ${project.tecnologias}`}
                            </h4>

                            {project.imagen && (
                                <img
                                    className="project-image"
                                    src={`http://localhost:3000/uploads/${project.imagen}`}
                                    alt={project.nombre}
                                />
                            )}

                            {project.descripcion && (
                                <p>
                                    {project.descripcion}
                                </p>
                            )}

                            <div className="project-links">
                                {project.repositorio && (
                                    <p>
                                        <strong>Repo:</strong>{" "}
                                        <a
                                            href={project.repositorio}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {project.repositorio}
                                        </a>
                                    </p>
                                )}

                                {project.deploy && (
                                    <p>
                                        <strong>Live:</strong>{" "}
                                        <a
                                            href={project.deploy}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {project.deploy}
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default PageTwo;