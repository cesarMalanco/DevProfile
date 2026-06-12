const pool = require("../config/db");

const createEducation = async (data) => {
    const {
        id_perfil,
        id_usuario,
        institucion,
        programa,
        periodo,
        descripcion,
        evidencia
    } = data;

    const [result] = await pool.query(
        `INSERT INTO educacion (
        id_perfil,
        id_usuario,
        institucion,
        programa,
        periodo,
        descripcion,
        evidencia,
        id_cv
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id_perfil,
            id_usuario,
            institucion,
            programa,
            periodo,
            descripcion,
            evidencia,
            null
        ]
    );

    return result;
};

module.exports = {
    createEducation
};