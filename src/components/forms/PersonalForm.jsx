import { useContext } from "react";
import useFormValidation from "../../hooks/useFormValidation";
import { CVContext } from "../../context/CVContext";
import { validateEmail, validateURL, validateLength } from "../../utils/validations";


function PersonalForm() {
  const { personalInfo, setPersonalInfo } = useContext(CVContext);

  const {
    errors,
    setErrors,
    clearErrors
  } = useFormValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPersonalInfo({
      ...personalInfo,
      [name]: value
    });
  };

  const validateForm = () => {
    let newErrors = {};

    // Campos obligatorios
    if (!personalInfo.fullName.trim()) {
      newErrors.fullName = "Nombre obligatorio";
    }

    if (!personalInfo.profession.trim()) {
      newErrors.profession = "Profesión obligatoria";
    }

    if (!personalInfo.city.trim()) {
      newErrors.city = "Ciudad obligatoria";
    }

    // Email
    if (personalInfo.email && !validateEmail(personalInfo.email)
    ) {
      newErrors.email = "Correo inválido";
    }

    // Longitudes
    if (
      personalInfo.fullName &&
      !validateLength(personalInfo.fullName, 3, 50)
    ) {
      newErrors.fullName =
        "El nombre debe tener entre 3 y 50 caracteres";
    }

    if (
      personalInfo.profession &&
      !validateLength(personalInfo.profession, 3, 50)
    ) {
      newErrors.profession =
        "La profesión debe tener entre 3 y 50 caracteres";
    }

    if (
      personalInfo.description &&
      !validateLength(personalInfo.description, 10, 300)
    ) {
      newErrors.description =
        "La descripción debe tener entre 10 y 300 caracteres";
    }

    // URLs
    if (
      personalInfo.github &&
      !validateURL(personalInfo.github)
    ) {
      newErrors.github = "URL inválida";
    }

    if (
      personalInfo.linkedin &&
      !validateURL(personalInfo.linkedin)
    ) {
      newErrors.linkedin = "URL inválida";
    }

    if (
      personalInfo.portfolio &&
      !validateURL(personalInfo.portfolio)
    ) {
      newErrors.portfolio = "URL inválida";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Datos guardados correctamente");
    }
  };

  const clearForm = () => {
    setPersonalInfo({
      fullName: "",
      profession: "",
      city: "",
      email: "",
      phone: "",
      description: "",
      github: "",
      linkedin: "",
      portfolio: ""
    });

    clearErrors();
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Datos Personales</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Nombre completo"
        value={personalInfo.fullName}
        onChange={handleChange}
      />
      <p className="error-message">
        {errors.fullName}
      </p>

      <input
        type="text"
        name="profession"
        placeholder="Profesión"
        value={personalInfo.profession}
        onChange={handleChange}
      />
      <p className="error-message">
        {errors.profession}
      </p>

      <input
        type="text"
        name="city"
        placeholder="Ciudad"
        value={personalInfo.city}
        onChange={handleChange}
      />
      <p className="error-message">
        {errors.city}
      </p>

      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={personalInfo.email}
        onChange={handleChange}
      />
      <p className="error-message">
        {errors.email}
      </p>

      <input
        type="text"
        name="phone"
        placeholder="Teléfono"
        value={personalInfo.phone}
        onChange={handleChange}
      />
      <p className="error-message">
        {errors.phone}
      </p>

      <textarea
        name="description"
        placeholder="Perfil profesional"
        value={personalInfo.description}
        onChange={handleChange}
      />
      <p className="error-message">
        {errors.description}
      </p>

      <input
        type="text"
        name="github"
        placeholder="GitHub"
        value={personalInfo.github}
        onChange={handleChange}
      />
      <p className="error-message">
        {errors.github}
      </p>

      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn"
        value={personalInfo.linkedin}
        onChange={handleChange}
      />
      <p className="error-message">
        {errors.linkedin}
      </p>

      <input
        type="text"
        name="portfolio"
        placeholder="Portafolio"
        value={personalInfo.portfolio}
        onChange={handleChange}
      />
      <p className="error-message">
        {errors.portfolio}
      </p>

      <div className="form-buttons">
        <button
          type="submit"
          className="btn-save"
        >
          Guardar
        </button>

        <button
          type="button"
          className="btn-clear"
          onClick={clearForm}
        >
          Eliminar Datos
        </button>
      </div>
    </form>
  );
}

export default PersonalForm;