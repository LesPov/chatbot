// flowValidation.js

const { addKeyword } = require('@bot-whatsapp/bot');
const { verifyUserPhoneNumber } = require('../services/verifyUserPhoneNumber');  // Asegúrate de importar desde el archivo correcto

const flowValidation = addKeyword([''])
    .addAnswer(
        'Verificando si tu usuario está registrado...',  // Mensaje mientras se valida si el usuario puede hacer consultas
        { capture: false },  // No capturamos respuestas en este punto
        async (ctx, { flowDynamic }) => {
            const phoneNumber = ctx.from;  // Obtenemos el número de teléfono del usuario

            // Verificamos si el usuario está registrado para realizar consultas
            const result = await verifyUserPhoneNumber(phoneNumber);

            if (result.error) {
                await flowDynamic(result.error);
            } else {
                await flowDynamic( `✅ `);
            }
        }
    );

module.exports = flowValidation;
