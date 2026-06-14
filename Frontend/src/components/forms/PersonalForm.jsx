import { useEffect, useState } from "react";
import "../../styles/EditorStyles.css";
import "../../styles/globalStyles.css";

const useImagePreview = (image) => {
  const [preview, setPreview] = useState(null);
  const backendUrl = "http://localhost:3000";

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    if (typeof image === "string") {
      const fullUrl =
        image.startsWith("http") || image.startsWith("/")
          ? image
          : `${backendUrl}/uploads/${image}`;
      setPreview(fullUrl);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  return preview;
};

function PersonalForm({ formData, setFormData, foto, setFoto, errors }) {
  const imagePreview = useImagePreview(foto);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});

  };
  return (
    <section>
      <div className="form-header">
        <div className="section-title">
          <h2>Personal</h2>
          <h2 className="highlight-title">Information</h2>
        </div>
        <p>Fill out the details below to create your professional CV</p>
      </div>

      <div className="photo-section">
        <div className="profile-preview">
          <div className="avatar-placeholder">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile preview" className="avatar-image" />
            ) : (
              <i className="fa-solid fa-user-astronaut"></i>
            )}
          </div>
          <button type="button" className="btn-edit-photo">
            <i className="fa-solid fa-camera"></i>
          </button>
        </div>
        <div className="photo-info">
          <h4>Profile Photo</h4>
          <p>Upload a professional photo</p>

          <div className="photo-actions">

            <input
              id="foto_perfil"
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
              style={{ display: "none" }}
            />

            <label htmlFor="foto_perfil" className="btn-upload">
              <i className="fa-solid fa-cloud-upload-alt"></i>
              Choose file
            </label>

            <span className="file-hint">{foto ? foto.name : "JPG, PNG • Max 5MB"}</span>

          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-grid">
          <div className="input-group">
            <label>
              <i className="fa-solid fa-user"></i>
              Full Name
            </label>
            <input
              type="text"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              placeholder="John Doe"
            />
            {errors?.nombre_completo && (
              <span className="error-message">
                {errors.nombre_completo}
              </span>
            )}
          </div>

          <div className="input-group">
            <label>
              <i className="fa-solid fa-briefcase"></i>
              Profession
            </label>
            <input
              type="text"
              name="profesion"
              placeholder="Frontend Developer"
              value={formData.profesion}
              onChange={handleChange}
            />
            {errors?.profesion && (
              <span className="error-message">
                {errors.profesion}
              </span>
            )}
          </div>
        </div>
        
        <div className="form-grid">
          <div className="input-group">
            <label>
              <i className="fa-solid fa-phone"></i>
              Phone
            </label>
            <input
              type="tel"
              name="telefono"
              placeholder="+1 555 555 555"
              value={formData.telefono}
              onChange={handleChange}
            />
            {errors?.telefono && (
              <span className="error-message">
                {errors.telefono}
              </span>
            )}
          </div>

          <div className="input-group">
            <label>
              <i className="fa-solid fa-envelope"></i>
              Email
            </label>
            <input
              type="email"
              name="correo"
              placeholder="john@email.com"
              value={formData.correo}
              onChange={handleChange}
            />
            {errors?.correo && (
              <span className="error-message">
                {errors.correo}
              </span>
            )}
          </div>
        </div>

        <div className="input-group">
          <label>
            <i className="fa-solid fa-location-dot"></i>
            Address
          </label>
          <input
            type="text"
            name="ciudad"
            placeholder="New York"
            value={formData.ciudad}
            onChange={handleChange}
          />
          {errors?.ciudad && (
            <span className="error-message">
              {errors.ciudad}
            </span>
          )}
        </div>

        <div className="input-group">
          <label>
            <i className="fa-solid fa-align-left"></i>
            Description
          </label>
          <textarea
            name="descripcion"
            placeholder="Tell recruiters about your experience, skills, and career goals..."
            rows="5"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
          {errors?.descripcion && (
            <span className="error-message">
              {errors.descripcion}
            </span>
          )}
          <span className="input-hint">Minimum 50 characters recommended</span>
        </div>
        <div className="form-grid">
          <div className="input-group">
            <label>
              <i className="fa-brands fa-github"></i>
              GitHub
            </label>
            <input
              type="url"
              name="github"
              placeholder="https://github.com/username"
              value={formData.github}
              onChange={handleChange}
            />
            {errors?.github && (
              <span className="error-message">
                {errors.github}
              </span>
            )}
          </div>

          <div className="input-group">
            <label>
              <i className="fa-brands fa-linkedin"></i>
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedin"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedin}
              onChange={handleChange}
            />
            {errors?.linkedin && (
              <span className="error-message">
                {errors.linkedin}
              </span>
            )}
          </div>

          <div className="input-group full-width">
            <label>
              <i className="fa-solid fa-globe"></i>
              Portfolio
            </label>
            <input
              type="url"
              name="portafolio"
              placeholder="https://yourportfolio.com"
              value={formData.portafolio}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

    </section>
  );
}

export default PersonalForm;