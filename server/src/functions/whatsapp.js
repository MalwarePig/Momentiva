async function cargarBaileys() {
  const baileys = await import('@whiskeysockets/baileys');
  return baileys;
}

async function iniciarWhatsApp() {
  const baileys = await cargarBaileys();
  const P = await import('pino');

  const { state, saveState } = baileys.useSingleFileAuthState('./auth.json');

  const sock = baileys.default({
    logger: P.default({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('connection.update', async ({ connection }) => {
    if (connection === 'open') {
      await sock.sendMessage('5218126156944@s.whatsapp.net', {
        text: 'Hola desde Node.js con Baileys!',
      });
    }
  });

  return sock;
}

module.exports = iniciarWhatsApp;
