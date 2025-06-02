import { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
  e.preventDefault();
  console.log('Formular wurde abgeschickt');

  try {
    const body = {
      email,
      password,
      display_name: displayName
    };

    console.log('Daten an Backend:', body); // NEU

    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    console.log('Antwort vom Backend:', res.status, data); // NEU

    if (res.ok) {
      setMessage('Registrierung erfolgreich!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else {
      setMessage(data.message || 'Fehler bei der Registrierung.');
    }
  } catch (err) {
    console.error('FEHLER BEI FETCH:', err); // NEU
    setMessage('Serverfehler.');
  }
};

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   console.log('Formular wurde abgeschickt');

    

  //   try {
  //     const res = await fetch('http://localhost:3000/api/auth/register', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         email,
  //         password,
  //         display_name: displayName
  //       })
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       setMessage('Registrierung erfolgreich!');
  //       setTimeout(() => {
  //         window.location.href = '/login';
  //       }, 2000);
  //     } else {
  //       setMessage(data.message || 'Fehler bei der Registrierung.');
  //     }
  //   } catch (err) {
  //     setMessage('Serverfehler.');
  //   }
  // };

  return (
    <div>
      <h1>Registrieren</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Anzeigename"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrieren</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
