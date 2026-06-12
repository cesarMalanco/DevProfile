import "../../styles/EditorStyles.css";
import "../../styles/globalStyles.css";

function ProjectForm({ projectData, setProjectData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({...projectData,[name]: value});
  };

  return (
    <section>
        <div className="form-section">
          <div className="section-header-forms">
            <div className="section-icon">
              <i className="fa-solid fa-folder-open"></i>
            </div>
            <div>
              <h3>Project Information</h3>
              <p>Add your most relevant work</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>
                <i className="fa-solid fa-diagram-project"></i>
                Project Name
              </label>
              <input
                type="text"
                name="nombre"
                value={projectData.nombre}
                onChange={handleChange}
                placeholder="Task Manager App"
              />
            </div>

            <div className="input-group">
              <label>
                <i className="fa-solid fa-code"></i>
                Technologies
              </label>
              <input
                type="text"
                name="tecnologias"
                value={projectData.tecnologias}
                onChange={handleChange}
                placeholder="React, Node.js, MySQL"
              />
            </div>
          </div>

          <div className="input-group">
            <label>
              <i className="fa-solid fa-align-left"></i>
              Description
            </label>
            <textarea
              rows="5"
              name="descripcion"
              value={projectData.descripcion}
              onChange={handleChange}
              placeholder="Describe your project, goals and achievements..."
            ></textarea>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>
                <i className="fa-brands fa-github"></i>
                Repository
              </label>
              <input
                type="url"
                name="repositorio"
                value={projectData.repositorio}
                onChange={handleChange}
                placeholder="https://github.com/user/project"
              />
            </div>

          <div className="input-group">
              <label>
                <i className="fa-solid fa-globe"></i>
                Live Demo
              </label>
              <input
                type="url"
                name="deploy"
                value={projectData.deploy}
                onChange={handleChange}
                placeholder="https://project.com"
              />
            </div>
          </div>

            <div className="photo-section">
              <div className="profile-preview">
                <div className="avatar-placeholder">
                  <i className="fa-solid fa-image"></i>
                </div>
                <button type="button" className="btn-edit-photo">
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>

              <div className="photo-info">
                <h4>Project Preview</h4>
                <p>The project image will appear here</p>
                <div className="photo-actions">
                  <input
                    id="Foto_proyecto"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setProjectData({...projectData, imagen: e.target.files[0]
                      })
                    }
                  style={{ display: "none" }}
                  />
                  <label htmlFor="Foto_proyecto" className="btn-upload">
                    <i className="fa-solid fa-cloud-upload-alt"></i>
                    Choose file
                  </label>
              <span className="file-hint">{projectData.imagen ? projectData.imagen.name : "JPG, PNG • Max 5MB"}</span>
                </div>
              </div>
            </div>

          <div className="skill-actions">
            <button type="button" className="btn-upload">
              <i className="fa-solid fa-eraser"></i>
              Clear
            </button>
            <button type="button" className="btn-upload">
              <i className="fa-solid fa-plus"></i>
              Add Project
            </button>
          </div>
        </div>

    </section>
  );
}

export default ProjectForm;