const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MySQLAdapter = require('@bot-whatsapp/database/mysql');
const { getUserByPhoneNumber } = require('./src/authService');  // Importamos la nueva función

// Conexión a MySQL
const MYSQL_DB_HOST = 'localhost';
const MYSQL_DB_USER = 'root';
const MYSQL_DB_PASSWORD = 'admin123';
const MYSQL_DB_NAME = 'proyecto-u';
const MYSQL_DB_PORT = '3306';

// Flujo principal de validación
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola, bienvenido a este *Chatbot*! Espera un momento mientras validamos tu información.')
    .addAnswer(
        'Verificando tu número...',
        { capture: false },
        async (ctx, { flowDynamic }) => {
            const phoneNumber = ctx.from;  // Obtener el número de teléfono del usuario desde WhatsApp

            // Realizamos la consulta a la base de datos
            const user = await getUserByPhoneNumber(phoneNumber);

            if (user) {
                // Si el usuario está registrado en la base de datos
                await flowDynamic(`✅ *Usuario encontrado:*\n\n*ID:* ${user.id}\n*Username:* ${user.username}\n*Email:* ${user.email}\n*Phone:* ${user.phoneNumber}\n*Rol:* ${user.rol}`);
                // Aquí puedes continuar con otros flujos o permisos
            } else {
                // Si no se encuentra el usuario
                await flowDynamic('❌ No estás registrado en nuestra base de datos. Por favor, contacta a soporte.');
            }
        }
    );

// Flujo de consulta de usuarios
const flowConsultaUsuarios = addKeyword(['consulta de usuarios'])
    .addAnswer('¿Cuál es el ID del usuario que deseas consultar?')
    .addAnswer(
        'Por favor, escribe el ID del usuario que quieres consultar:',
        { capture: true },  // Captura la respuesta del usuario
        async (ctx, { fallBack, flowDynamic }) => {
            const userId = parseInt(ctx.body);  // Convertimos el ID ingresado a número

            if (isNaN(userId)) {
                return fallBack('⚠️ Por favor, proporciona un número de ID válido.');
            }

            // Realizamos la consulta a la base de datos
            const user = await getUserById(userId);

            if (user) {
                // Formateamos la respuesta con los datos del usuario
                await flowDynamic(`✅ *Usuario encontrado:*\n\n*ID:* ${user.id}\n*Username:* ${user.username}\n*Email:* ${user.email}\n*Phone:* ${user.phoneNumber}\n*Rol:* ${user.rol}`);
            } else {
                // Si no se encuentra el usuario
                await flowDynamic('❌ No se encontró ningún usuario con ese ID.');
            }
        }
    );

// Inicialización del bot
const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    });

    const adapterFlow = createFlow([flowPrincipal, flowConsultaUsuarios]);  // Agregamos el flujo de consulta de usuarios
    const adapterProvider = createProvider(BaileysProvider);
    
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();  // Genera el código QR para conectar el bot a WhatsApp
};

main();
