const { getConnection } = require('../database/dbConfig');

// Función para obtener un usuario por su número de teléfono
async function getUserByPhoneNumber(phoneNumber) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
        'SELECT id, username, email, phoneNumber, rol, status FROM auths WHERE phoneNumber = ?', 
        [phoneNumber]
    );
    await connection.end();

    // Devolver el primer registro encontrado o null si no existe
    return rows.length > 0 ? rows[0] : null;
}


module.exports = {
    getUserByPhoneNumber,
};
