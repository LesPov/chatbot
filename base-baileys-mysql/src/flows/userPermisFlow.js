const { addKeyword } = require('@bot-whatsapp/bot');

const userPermisFlow = addKeyword("SinPermisos")
    .addAnswer(
        "este es el flujo para los usurios normales",
        { capture: false }
    );

module.exports = {
    userPermisFlow
};
