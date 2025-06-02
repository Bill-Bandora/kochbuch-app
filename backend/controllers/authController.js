const db = require('../models/db');
const bcrypt = require('bcrypt');

const register = (req, res) => {
  const { email, password, display_name } = req.body;

  if (!email || !password || !display_name) {
    return res.status(400).json({ message: 'Alle Felder sind erforderlich.' });
  }

  const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@$%?]).{8,}$/;
  if (!passRegex.test(password)) {
    return res.status(400).json({ message: 'Passwort erfüllt nicht die Anforderungen.' });
  }

  db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB-Fehler (SELECT)' });
    if (results.length > 0) {
      return res.status(409).json({ message: 'E-Mail ist bereits registriert.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO user (email, password, display_name) VALUES (?, ?, ?)',
      [email, hashedPassword, display_name],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'DB-Fehler (INSERT)' });
        res.status(201).json({ message: 'Registrierung erfolgreich.' });
      }
    );
  });
};

module.exports = { register };
