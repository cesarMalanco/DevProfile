import { useContext, useState } from "react";
import { CVContext } from "../../context/CVContext";
import { validateImageURL } from "../../utils/validations";

function ImageProfile() {
  const { profileImage, setProfileImage } = useContext(CVContext);

  const [error, setError] = useState("");
  const [preview, setPreview] = useState(profileImage);

  // Archivo local
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("El archivo no es una imagen válida");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(reader.result);
        setPreview(reader.result);
        setError("");
      };

      reader.readAsDataURL(file);
    }
  };

  // Imagen por URL
  const handleURLChange = (e) => {
    const url = e.target.value;

    setPreview(url);

    if (!validateImageURL(url)) {
      setError("URL de imagen inválida");
      return;
    }

    setProfileImage(url);
    setError("");
  };

  // Limpiar imagen
  const clearImage = () => {
    setProfileImage("");
    setPreview("");
    setError("");
  };

  return (
    <div className="form-card">
      <h2>Imagen de Perfil</h2>

      {/* Archivo local */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <br />

      {/* URL */}
      <input
        type="text"
        placeholder="URL de imagen"
        onChange={handleURLChange}
      />

      <p style={{ color: "red" }}>{error}</p>

      {/* Preview */}
      {preview && (
        <div>
          <img
            src={preview}
            alt="preview"
            width="120"
            style={{ borderRadius: "10px" }}
          />
        </div>
      )}

      <button type="button" className="btn-clear" onClick={clearImage}>
        Eliminar imagen
      </button>
    </div>
  );
}

export default ImageProfile;