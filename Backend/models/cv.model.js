const pool = require("../config/db");

const createCv = async (data) => {
    const { id_usuario, id_plantilla, nombre_cv } = data;
    const [result] = await pool.query(
        `INSERT INTO cvs (
            id_usuario,
            id_plantilla,
            nombre_cv
        ) VALUES (?, ?, ?)`,
        [
            id_usuario,
            id_plantilla || null,
            nombre_cv || null
        ]
    );

    return result;
};

const getUserCvs = async (id_usuario) => {
    const [rows] = await pool.query(
        `SELECT id_cv, id_usuario, id_plantilla, nombre_cv, fecha_creacion
         FROM cvs
         WHERE id_usuario = ?
         ORDER BY fecha_creacion DESC`,
        [id_usuario]
    );

    return rows;
};

const updateCv = async (id_cv, data) => {
    const { nombre_cv, id_plantilla } = data;
    const [result] = await pool.query(
        `UPDATE cvs SET nombre_cv = ?, id_plantilla = ? WHERE id_cv = ?`,
        [nombre_cv || null, id_plantilla || null, id_cv]
    );

    return result;
};

const getCvById = async (id_cv) => {
    const [rows] = await pool.query(
        `SELECT id_cv, id_usuario, id_plantilla, nombre_cv, fecha_creacion
         FROM cvs
         WHERE id_cv = ? LIMIT 1`,
        [id_cv]
    );

    const cv = rows[0] || null;
    if (!cv) return null;

    const [skills] = await pool.query(
        `SELECT * FROM habilidades WHERE id_cv = ?`,
        [id_cv]
    );

    const [projects] = await pool.query(
        `SELECT * FROM proyectos WHERE id_cv = ?`,
        [id_cv]
    );

    const [education] = await pool.query(
        `SELECT * FROM educacion WHERE id_cv = ?`,
        [id_cv]
    );

    const [languages] = await pool.query(
        `SELECT * FROM idiomas WHERE id_cv = ?`,
        [id_cv]
    );

    return {
        cv,
        skills,
        projects,
        education,
        languages
    };
};

const deleteCv = async (id_cv) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [cvRow] = await connection.query(
            `SELECT id_usuario FROM cvs WHERE id_cv = ? LIMIT 1`,
            [id_cv]
        );
        const userId = cvRow[0] ? cvRow[0].id_usuario : null;

        await connection.query(
            `DELETE FROM habilidades WHERE id_cv = ?`,
            [id_cv]
        );

        await connection.query(
            `DELETE FROM proyectos WHERE id_cv = ?`,
            [id_cv]
        );

        await connection.query(
            `DELETE FROM educacion WHERE id_cv = ?`,
            [id_cv]
        );

        await connection.query(
            `DELETE FROM idiomas WHERE id_cv = ? OR (id_cv IS NULL AND id_usuario = ?)`,
            [id_cv, userId]
        );

        const [result] = await connection.query(
            `DELETE FROM cvs WHERE id_cv = ?`,
            [id_cv]
        );

        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = {
    createCv,
    getUserCvs,
    getCvById,
    updateCv,
    deleteCv
};
