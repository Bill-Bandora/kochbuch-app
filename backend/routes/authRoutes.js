// routes/authRoutes.js – Routet HTTP-Anfragen zur Registrierung
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// POST /api/auth/register – neuer Nutzer
router.post('/register', register);

// POST /api/auth/login – Nutzer anmelden
router.post('/login', login);



module.exports = router;
