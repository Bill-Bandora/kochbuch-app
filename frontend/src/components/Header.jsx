import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ padding: '1rem', background: '#eee' }}> 
      <h2>👨‍🍳 Kochbuch</h2>
      <nav>
        <Link to="/">Start</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Registrieren</Link>
      </nav>
    </header>
  );
}

export default Header;
// Header-Komponente für die Navigation