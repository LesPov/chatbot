const mysql = require('mysql2/promise');

const MYSQL_DB_HOST = 'localhost';
const MYSQL_DB_USER = 'root';
const MYSQL_DB_PASSWORD = 'admin123';
const MYSQL_DB_NAME = 'proyecto-u';
const MYSQL_DB_PORT = '3306';

// Función para obtener un usuario por ID desde la tabla auths
async function getUserById(userId) {
    const connection = await mysql.createConnection({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    });

    const [rows] = await connection.execute('SELECT id, username, email, phoneNumber, rol FROM auths WHERE id = ?', [userId]);

    await connection.end();

    if (rows.length > 0) {
        return rows[0];  // Retorna el primer resultado encontrado
    } else {
        return null;  // No se encontró el usuario
    }
}

// Función para obtener un usuario por número de teléfono desde la tabla auths
async function getUserByPhoneNumber(phoneNumber) {
    const connection = await mysql.createConnection({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    });

    const [rows] = await connection.execute('SELECT id, username, email, phoneNumber, rol FROM auths WHERE phoneNumber = ?', [phoneNumber]);

    await connection.end();

    if (rows.length > 0) {
        return rows[0];  // Retorna el primer resultado encontrado
    } else {
        return null;  // No se encontró el usuario
    }
}

module.exports = {
    getUserById,
    getUserByPhoneNumber
};
