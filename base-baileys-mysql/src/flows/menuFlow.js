const { addKeyword } = require('@bot-whatsapp/bot');

const menu = "Este es el menú de opciones, elige opciones 1, 2, 3, 4, 5 o 0";

const menuFlow = addKeyword("Menu")

.addAnswer(
    menu,
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        if (!["1", "2", "3", "4", "5", "0"].includes(ctx.body)) {
            return fallBack(
                "Respuesta no válida, por favor selecciona una de las opciones."
            );
        }
        switch (ctx.body) {
            case "1":
                return gotoFlow('flowPrincipal'); // Asegúrate de que gotoFlow se devuelva
            case "2":
                return gotoFlow("menu2"); // Asegúrate de que gotoFlow se devuelva
            case "3":
                return gotoFlow("menu3"); // Asegúrate de que gotoFlow se devuelva
            case "4":
                return gotoFlow("menu4"); // Asegúrate de que gotoFlow se devuelva
            case "5":
                return gotoFlow("menu5"); // Asegúrate de que gotoFlow se devuelva
            case "0":
                return await flowDynamic(
                    "Saliendo... Puedes volver a acceder a este menú escribiendo '*Menu'"
                );
        }
    }
);

module.exports = {
    menuFlow
};
