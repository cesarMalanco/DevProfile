const pool = require("../config/db");

const getProfileByUser = async (id_usuario) => {
    const [rows] = await pool.query(
        `SELECT * FROM perfiles WHERE id_usuario = ? LIMIT 1`,
        [id_usuario]
    );

    return rows[0] || null;
};

const getProfileByCv = async (id_cv) => {
    const [rows] = await pool.query(
        `SELECT * FROM perfiles WHERE id_cv = ? LIMIT 1`,
        [id_cv]
    );

    return rows[0] || null;
};

const createProfile = async (profileData) => {
    const {
        id_usuario,
        id_cv,
        nombre_completo,
        profesion,
        ciudad,
        correo,
        telefono,
        descripcion,
        github,
        linkedin,
        portafolio,
        foto_perfil
    } = profileData;

    const [result] = await pool.query(
        `INSERT INTO perfiles (
            id_usuario,
            id_cv,
            nombre_completo,
            profesion,
            ciudad,
            correo,
            telefono,
            descripcion,
            github,
            linkedin,
            portafolio,
            foto_perfil
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id_usuario,
            id_cv,
            nombre_completo,
            profesion,
            ciudad,
            correo,
            telefono,
            descripcion,
            github,
            linkedin,
            portafolio,
            foto_perfil
        ]
    );

    return result;
};

const updateProfile = async (id_perfil, profileData) => {
    const {
        nombre_completo,
        profesion,
        ciudad,
        correo,
        telefono,
        descripcion,
        github,
        linkedin,
        portafolio,
        foto_perfil
    } = profileData;

    const [result] = await pool.query(
        `UPDATE perfiles SET
            nombre_completo = ?,
            profesion = ?,
            ciudad = ?,
            correo = ?,
            telefono = ?,
            descripcion = ?,
            github = ?,
            linkedin = ?,
            portafolio = ?,
            foto_perfil = ?
        WHERE id_perfil = ?`,
        [
            nombre_completo,
            profesion,
            ciudad,
            correo,
            telefono,
            descripcion,
            github,
            linkedin,
            portafolio,
            foto_perfil,
            id_perfil
        ]
    );

    return result;
};

const getProfileStats = async (userId) => {
    const [result] = await pool.query(
        `SELECT
            (SELECT COUNT(*) FROM cvs WHERE id_usuario = ?) AS cvs,
            (SELECT COUNT(*) FROM habilidades WHERE id_usuario = ?) AS skills,
            (SELECT COUNT(*) FROM proyectos WHERE id_usuario = ?) AS projects,
                (SELECT COUNT(*) FROM educacion WHERE id_usuario = ?) AS education,
                (SELECT COUNT(*) FROM idiomas WHERE id_usuario = ?) AS languages`,
            [userId, userId, userId, userId, userId]
    );

    return result;
};

module.exports = {
    getProfileByUser,
    getProfileByCv,
    createProfile,
    updateProfile,
    getProfileStats
};