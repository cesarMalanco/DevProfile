const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {

        const {nombre,email,password} = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const [userExists] = await pool.query("SELECT * FROM usuarios WHERE email = ?",[email]);

        if (userExists.length > 0) {
            return res.status(409).json({
                message: "Email is already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await pool.query(`INSERT INTO usuarios (nombre,email,password) VALUES (?,?,?)`, [nombre,email,hashedPassword]);
        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        const [users] = await pool.query("SELECT * FROM usuarios WHERE email = ?",[email]);

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password,user.password);

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
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
            message: "Login successful",
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
            message: "Internal server error"
        });
    }
};

module.exports = {register,login};