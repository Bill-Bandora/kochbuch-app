// models/db.js – Verbindet zur MariaDB-Datenbank

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Lädt Umgebungsvariablen

// Erstellt eine Verbindung (ohne Pool – für den Anfang okay)
const db = mysql.createConnection({
  host: process.env.DB_HOST,     // z. B. localhost
  user: process.env.DB_USER,     // z. B. root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Verbindung testen
db.connect((err) => {
  if (err) {
    console.error('Datenbankverbindung fehlgeschlagen:', err.message);
  } else {
    console.log('Mit MariaDB verbunden!');
  }
});

module.exports = db; // Export für andere Dateien
