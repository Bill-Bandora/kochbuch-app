// app.js – Konfiguriert die Express-Anwendung

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Lädt Umgebungsvariablen aus .env

const app = express();

app.use(cors()); // Erlaubt Anfragen von anderen Domains (z. B. frontend)
app.use(express.json()); // Ermöglicht JSON-Daten im Body von Requests

// Test-Route
app.get('/', (req, res) => {
  res.send('Kochbuch API läuft!');
});

module.exports = app; // Exportiert die App für server.js



const authRoutes = require('./routes/authRoutes'); // Neue Route einbinden

// Middleware
app.use(cors());
app.use(express.json());

// Testroute
app.get('/', (req, res) => {
  res.send('Kochbuch API läuft!');
});

// Auth-API
app.use('/api/auth', authRoutes); // z. B. POST /api/auth/register

module.exports = app;
