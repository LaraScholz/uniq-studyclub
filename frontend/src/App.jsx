import './App.css';
import Chat from './components/Chat';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo">Uniq Study Club</h1>
        <ul className="nav-links">
          <li><a href="#">Lernen</a></li>
          <li><a href="#">Community</a></li>
          <li><a href="#">Über uns</a></li>
        </ul>
      </nav>

      <section className="hero">
        <h2>Herzlich Willkommen.</h2>
        <p className="hero-sub">
          Nimm dir einen Moment nur für dich, atme kurz durch und fühl dich willkommen. 🤍
        </p>
        <p className="hero-gold">Schön, dass du da bist.</p>
      </section>

      <Chat />

      <footer className="footer">
        © 2026 Uniq Study Club · Where studying feels like a luxury.
      </footer>
    </div>
  );
}

export default App;
