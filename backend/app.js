// app.js – Konfiguriert die Express-Anwendung

const express = require('express');   // Importiert Express, um eine Webanwendung zu erstellen
const cors = require('cors'); // Erlaubt Cross-Origin Resource Sharing (CORS) für Anfragen von anderen Domains
const dotenv = require('dotenv'); // Lädt Umgebungsvariablen aus .env
const db = require('./models/db'); // Importiert die Datenbankverbindung
const authRoutes = require('./routes/authRoutes'); // Importiert die Authentifizierungsrouten
dotenv.config(); // Lädt Umgebungsvariablen aus .env

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Erlaubt Anfragen von dieser Domain (Frontend)
  credentials: true // Erlaubt Cookies und Authentifizierungsheader
})); // Erlaubt Anfragen von anderen Domains (z. B. frontend)
app.use(express.json()); // Ermöglicht JSON-Daten im Body von Requests

// Test-Route
app.get('/', (req, res) => { 
  res.send('Kochbuch API läuft!'); // Einfacher Test, um zu prüfen, ob die API läuft
});

// Auth-API
app.use('/api/auth', authRoutes); // z. B. POST /api/auth/register

module.exports = app; // Exportiert die Express-App für server.js
