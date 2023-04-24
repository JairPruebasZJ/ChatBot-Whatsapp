// Importar las dependencias
const fs = require('fs');
const { Client } = require('@open-wa/wa-automate');
require('dotenv').config();

// Leer las credenciales del archivo .env
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const phoneNumber = process.env.PHONE_NUMBER;

// Crear un cliente de WhatsApp Business
const client = new Client();

// Escuchar el evento de autenticación exitosa
client.on('authenticated', (session) => {
  console.log('Autenticado con éxito');
});

// Escuchar el evento de mensaje recibido
client.on('message', async (message) => {
  // Obtener el número de teléfono del remitente
  const sender = message.from;
  // Obtener el contenido del mensaje en minúsculas
  const content = message.body.toLowerCase();

  // Responder automáticamente al mensaje "hola"
  if (content === 'Hola') {
    await client.sendText(sender, 'Gracias por comunicarte!');
  } else {
    // Responder automáticamente a cualquier otro mensaje
    await client.sendText(sender, 'Hola! Soy un chat bot y estoy aquí para ayudarte. ¿En qué puedo asistirte?');
  }
});

// Iniciar sesión en la API de WhatsApp Business
client.initialize({
  apiKey: apiKey,
  apiSecret: apiSecret,
  phoneNumber: phoneNumber,
}).then(() => {
  console.log('Inicio de sesión exitoso');
}).catch((error) => {
  console.error('Error al iniciar sesión:', error);
});
