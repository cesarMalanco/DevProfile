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

const updateLanguage = async (id, data) => {
    const { idioma, nivel, descripcion } = data;
    const [result] = await pool.query(
        `UPDATE idiomas SET idioma = ?, nivel = ?, descripcion = ? WHERE id_idioma = ?`,
        [idioma, nivel, descripcion, id]
    );
    return result;
};

const deleteLanguageById = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM idiomas WHERE id_idioma = ?`,
        [id]
    );
    return result;
};

module.exports = { createLanguage, updateLanguage, deleteLanguageById };