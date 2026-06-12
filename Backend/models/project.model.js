const pool = require("../config/db");

const createProject = async (data) => {
    const {
        id_perfil,
        id_usuario,
        nombre,
        descripcion,
        tecnologias,
        repositorio,
        deploy,
        imagen,
        id_cv
    } = data;

    const [result] = await pool.query(
        `INSERT INTO proyectos (
        id_perfil,
        id_usuario,
        nombre,
        descripcion,
        tecnologias,
        repositorio,
        deploy,
        imagen,
        id_cv
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id_perfil,
            id_usuario,
            nombre,
            descripcion,
            tecnologias,
            repositorio,
            deploy,
            imagen,
            id_cv || null
        ]
    );

    return result;
};

module.exports = { createProject };