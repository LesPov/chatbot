const { addKeyword } = require('@bot-whatsapp/bot');
const { getUserByPhoneNumber } = require('../services/authService');

// Flujo principal para la validación de usuarios
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola, bienvenido a este *Chatbot*! Estamos verificando tu información, por favor espera un momento.')
    .addAnswer(
        'Estamos validando tu número de teléfono...',
        { capture: false },
        async (ctx, { flowDynamic }) => {
            const phoneNumber = ctx.from;
            const user = await getUserByPhoneNumber(phoneNumber);

            if (user) {
                await flowDynamic(`✅ *Tu información de usuario:*\n\n*ID:* ${user.id}\n*Username:* ${user.username}\n*Email:* ${user.email}\n*Teléfono:* ${user.phoneNumber}\n*Rol:* ${user.rol}`);
            } else {
                await flowDynamic('❌ No estás registrado en nuestra base de datos. Regístrate en el siguiente enlace: [link_de_registro]');
            }
        }
    );

module.exports = flowPrincipal;
