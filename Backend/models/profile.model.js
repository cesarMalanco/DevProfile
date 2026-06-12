const pool = require("../config/db");

const createProfile = async (profileData) => {

    const {
        id_usuario,
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id_usuario,
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

module.exports = {
    createProfile
};