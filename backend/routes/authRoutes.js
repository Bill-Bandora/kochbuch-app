// routes/authRoutes.js – Routet HTTP-Anfragen zur Registrierung

const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// POST /api/auth/register – neuer Nutzer
router.post('/register', register);

module.exports = router;
