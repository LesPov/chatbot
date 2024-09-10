const errorMessages = require('../middleware/errorMessages');
const successMessages = require('../middleware/successMessages');
const { getUserByPhoneNumber } = require('../services/authService');

async function verifyUserPhoneNumber(phoneNumber, flowDynamic) {
    let result = { user: null, error: null };

    try {
        // Verificar si el número de teléfono está registrado
        const user = await getUserByPhoneNumber(phoneNumber);

        if (!user) {
            // Si el usuario no está registrado
            await flowDynamic(errorMessages.userNotFound);
        } else {
            // Si el usuario está registrado, verificamos el rol
            if (user.rol === 'Admin') {
                // Mensaje para administradores
                await flowDynamic(successMessages.adminWelcome);
                result.user = user;  // Guardar el usuario como Admin
            } else if (user.rol === 'User') {
                // Mensaje para usuarios regulares sin permisos
                await flowDynamic(successMessages.userNoPermissions);
                result.user = user;  // Guardar el usuario como User
            } else {
                // Para cualquier rol no reconocido
                await flowDynamic(errorMessages.unrecognizedRole);
            }
        }
    } catch (error) {
        // Manejo de errores en caso de fallo en la verificación
        await flowDynamic(errorMessages.verificationError);
        console.error('Error en verifyUserPhoneNumber:', error);
    }

    return result;
}

module.exports = {
    verifyUserPhoneNumber
};
