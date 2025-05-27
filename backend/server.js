// server.js – Startet den Server

const app = require('./app'); // Importiert die Express-App
const PORT = process.env.PORT || 3000; // Nutzt .env oder Fallback

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
// Hier wird der Server gestartet und auf dem angegebenen Port (3000) lauscht
// und gibt eine Bestätigung in der Konsole aus.