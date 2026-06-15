// ===== CONEXIÓN A BD ====
require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,

    waitForConnections: true,
    connectionLimit: 40,
    queueLimit: 0,

    // Configuración para producción
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000, // 10 segundos

    // Timeout de conexión
    connectTimeout: 10000, // 10 segundos

    ssl: {
        rejectUnauthorized: false 
    },

    // Timezone
    timezone: "local",
});

// Manejar errores de conexión
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("MySQL conectado correctamente");
        connection.release();
    } catch (error) {
        console.error("Error conectando MySQL:");
        console.error(error.message);
    }
})();

// ===== EXPORTACIÓN DEL POOL =====
module.exports = pool;
