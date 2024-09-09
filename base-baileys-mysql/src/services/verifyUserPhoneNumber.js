const { getUserByPhoneNumber } = require('../services/authService');

async function verifyUserPhoneNumber(phoneNumber) {
    let result = { user: null, error: null };

    try {
        // Verificar si el número de teléfono está registrado
        const user = await getUserByPhoneNumber(phoneNumber);

        if (!user) {
            // Si el usuario no existe, establecer el mensaje de error
            result.error = 'El número de teléfono no está registrado.';
        } else {
            // Si el usuario existe, establecer la información del usuario
            result.user = user;
        }
    } catch (error) {
        // Manejar cualquier error que ocurra durante la verificación
        result.error = 'Ocurrió un error al verificar el número de teléfono.';
    }

    return result;
}

module.exports = {
    verifyUserPhoneNumber
};
