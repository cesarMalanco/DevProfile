const pool = require("../config/db");

const createSkill = async (skillData) => {

    const {
        id_usuario,
        id_perfil,
        id_cv,
        nombre,
        categoria,
        nivel,
        descripcion
    } = skillData;

    const [result] = await pool.query(
        `INSERT INTO habilidades (
            id_usuario,
            id_perfil,
            id_cv,
            nombre,
            categoria,
            nivel,
            descripcion
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            id_usuario,
            id_perfil,
            id_cv || null,
            nombre,
            categoria,
            nivel,
            descripcion
        ]
    );

    return result;
};

module.exports = {
    createSkill
};