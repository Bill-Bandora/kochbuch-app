const db = require('../models/db');
const bcrypt = require('bcrypt');

// Nutzer registrieren
const register = (req, res) => {
  const { email, password, display_name } = req.body;

  if (!email || !password || !display_name) {
    return res.status(400).json({ message: 'Alle Felder sind erforderlich.' });
  }

  // Passwort-Sicherheitsprüfung
  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@$%?]).{8,}$/;
  if (!passRegex.test(password)) {
    return res.status(400).json({ message: 'Passwort erfüllt nicht die Anforderungen.' });
  }

  // E-Mail prüfen
  db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB-Fehler (SELECT)', error: err.message });

    if (results.length > 0) {
      return res.status(409).json({ message: 'E-Mail bereits registriert.' });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Nutzer einfügen
    db.query(
      'INSERT INTO user (email, password, display_name) VALUES (?, ?, ?)',
      [email, hashedPassword, display_name],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'DB-Fehler (INSERT)', error: err.message });

        res.status(201).json({ message: 'Registrierung erfolgreich.' });
      }
    );
  });
};
// Nutzer anmelden
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-Mail und Passwort erforderlich.' });
  }

  db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB-Fehler', error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Ungültige E-Mail oder Passwort.' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Ungültige E-Mail oder Passwort.' });
    }

    // JWT erzeugen
    const token = jwt.sign(
      { id: user.id, email: user.email, display_name: user.display_name },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login erfolgreich.',
      token,
      user: {
        id: user.id,
        email: user.email,
        display_name: user.display_name
      }
    });
  });
};

module.exports = { register, login };
