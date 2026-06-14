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

const updateProject = async (id, data) => {
    const { nombre, descripcion, tecnologias, repositorio, deploy, imagen } = data;
    const [result] = await pool.query(
        `UPDATE proyectos SET nombre = ?, descripcion = ?, tecnologias = ?, repositorio = ?, deploy = ?, imagen = ? WHERE id_proyecto = ?`,
        [nombre, descripcion, tecnologias, repositorio, deploy, imagen, id]
    );
    return result;
};

const deleteProjectById = async (id) => {
    const [result] = await pool.query(
        `DELETE FROM proyectos WHERE id_proyecto = ?`,
        [id]
    );
    return result;
};

module.exports = { createProject, updateProject, deleteProjectById };