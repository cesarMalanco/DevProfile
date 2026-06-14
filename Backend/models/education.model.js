const pool = require("../config/db");

const createEducation = async (data) => {
    const {
        id_perfil,
        id_usuario,
        id_cv,
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
            id_cv || null
        ]
    );

    return result;
};

const updateEducation = async (id, data) => {
    const { institucion, programa, periodo, descripcion, evidencia } = data;
    const [result] = await pool.query(
        `UPDATE educacion SET institucion = ?, programa = ?, periodo = ?, descripcion = ?, evidencia = ? WHERE id_educacion = ?`,
        [institucion, programa, periodo, descripcion, evidencia, id]
    );
    return result;
};

const deleteEducationById = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM educacion WHERE id_educacion = ?`,
        [id]
    );
    return result;
};

module.exports = {
    createEducation,
    updateEducation,
    deleteEducationById
};