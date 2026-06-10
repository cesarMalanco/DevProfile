const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {

        const {nombre,email,password} = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        const [userExists] = await pool.query("SELECT * FROM usuarios WHERE email = ?",[email]);

        if (userExists.length > 0) {
            return res.status(409).json({
                message: "El correo ya está registrado"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await pool.query(`INSERT INTO usuarios (nombre,email,password) VALUES (?,?,?)`, [nombre,email,hashedPassword]);
        res.status(201).json({
            message: "Usuario registrado correctamente"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        const [users] = await pool.query("SELECT * FROM usuarios WHERE email = ?",[email]);

        if (users.length === 0) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password,user.password);

        if (!validPassword) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        }

        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login exitoso",
            token,
            usuario: {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};

module.exports = {register,login};