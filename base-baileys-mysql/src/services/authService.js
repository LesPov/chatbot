// authService.js

const { getConnection } = require('../database/dbConfig');

// Función para obtener un usuario por número de teléfono
async function getUserByPhoneNumber(phoneNumber) {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT id, username, email, phoneNumber, rol FROM auths WHERE phoneNumber = ?', [phoneNumber]);
    await connection.end();

    return rows.length > 0 ? rows[0] : null;
}

// Función para obtener el rol de un usuario dado su ID
async function getUserRoleById(userId) {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT rol FROM auths WHERE id = ?', [userId]);
    await connection.end();

    return rows.length > 0 ? rows[0].rol : null;
}

module.exports = {
    getUserByPhoneNumber,
    getUserRoleById,
};
