const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const { verifyUserPhoneNumber } = require('../services/verifyUserPhoneNumber');
const { menuFlow } = require('./menuFlow'); // Flujo para admins
const { userPermisFlow } = require('./userPermisFlow'); // Flujo para usuarios sin acceso

const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer(
        'Verificando si tu usuario está registrado...',
        { capture: false },
        async (ctx, { flowDynamic, gotoFlow }) => {
            const phoneNumber = ctx.from;  // Obtenemos el número de teléfono del usuario

            // Verificamos si el usuario está registrado y su rol
            const verificationResult = await verifyUserPhoneNumber(phoneNumber, flowDynamic);

            if (verificationResult.user) {
                if (verificationResult.user.rol === 'Admin') {
                    // Si es admin, lo redirigimos al menú principal
                    return gotoFlow(menuFlow);
                } else if (verificationResult.user.rol === 'User') {
                    // Si es un usuario regular, lo redirigimos a un flujo de "sin permisos"
                    return gotoFlow(userPermisFlow);
                }
            }
        }
    );

module.exports = {
    flowPrincipal
};
