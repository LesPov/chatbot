const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MySQLAdapter = require('@bot-whatsapp/database/mysql');
const { flowPrincipal } = require('../flows/flowPrincipal');
const { menuFlow } = require('../flows/menuFlow');
const { userPermisFlow } = require('../flows/userPermisFlow');


// Configuración del bot y la base de datos
const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: 'localhost',
        user: 'root',
        database: 'proyecto-u',
        password: 'admin123',
        port: '3306',
    });

    const adapterFlow = createFlow([flowPrincipal,menuFlow,userPermisFlow]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

module.exports = main;
