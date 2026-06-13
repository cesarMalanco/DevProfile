const pool = require("../config/db");

const createLanguage = async (data) => {
    const {
        id_perfil,
        id_usuario,
        idioma,
        nivel,
        descripcion,
        id_cv
    } = data;

    const [result] = await pool.query(
        `INSERT INTO idiomas (
        id_perfil,
        id_usuario,
        idioma,
        nivel,
        descripcion,
        id_cv
    ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
            id_perfil,
            id_usuario,
            idioma,
            nivel,
            descripcion,
            id_cv || null
        ]
    );

    return result;
};

module.exports = { createLanguage };