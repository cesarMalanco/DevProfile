const pool = require("../config/db");

const createLanguage = async (data) => {
    const {
        id_perfil,
        id_usuario,
        idioma,
        nivel,
        descripcion
    } = data;

    const [result] = await pool.query(
        `INSERT INTO idiomas (
        id_perfil,
        id_usuario,
        idioma,
        nivel,
        descripcion
    ) VALUES (?, ?, ?, ?, ?)`,
        [
            id_perfil,
            id_usuario,
            idioma,
            nivel,
            descripcion
        ]
    );

    return result;
};

module.exports = { createLanguage };