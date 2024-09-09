const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'proyecto-u',
    port: '3306',
};

async function getConnection() {
    return await mysql.createConnection(dbConfig);
}

module.exports = { getConnection };
