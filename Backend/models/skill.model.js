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

const getSkillsByUser = async (userId) => {
    const [rows] = await pool.query(
        `SELECT * FROM habilidades WHERE id_usuario = ? ORDER BY id_habilidad DESC`,
        [userId]
    );
    return rows;
};

const updateSkill = async (id, data) => {
    const { nombre, categoria, nivel, descripcion } = data;
    const [result] = await pool.query(
        `UPDATE habilidades SET nombre = ?, categoria = ?, nivel = ?, descripcion = ? WHERE id_habilidad = ?`,
        [nombre, categoria, nivel, descripcion, id]
    );
    return result;
};

const deleteSkillById = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM habilidades WHERE id_habilidad = ?`,
        [id]
    );
    return result;
};

module.exports = {
    createSkill,
    getSkillsByUser,
    updateSkill,
    deleteSkillById
};