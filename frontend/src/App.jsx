import { useState, useEffect } from 'react'
import './App.css'
import Chat from './components/Chat'
import Auth from './components/Auth'
import Community from './components/Community'
import { supabase } from './supabase'

function App() {
  const [nutzer, setNutzer] = useState(null)
  const [aktiveSeite, setAktiveSeite] = useState('lernen')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setNutzer(session?.user ?? null)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setNutzer(session?.user ?? null)
    })
  }, [])

  const ausloggen = async () => {
    await supabase.auth.signOut()
  }

  if (nutzer) {
    return (
      <div className="app">
        <nav className="navbar">
          <h1 className="logo">Uniq Study Club</h1>
          <ul className="nav-links">
            <li>
              <a href="#" onClick={() => setAktiveSeite('lernen')}
                style={{ color: aktiveSeite === 'lernen' ? '#C4A55A' : '' }}>
                Lernen
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setAktiveSeite('community')}
                style={{ color: aktiveSeite === 'community' ? '#C4A55A' : '' }}>
                Community
              </a>
            </li>
            <li><a href="#" onClick={ausloggen}>Ausloggen</a></li>
          </ul>
        </nav>
        {aktiveSeite === 'lernen' && <Chat />}
        {aktiveSeite === 'community' && <Community nutzer={nutzer} />}
        <footer className="footer">
          © 2026 Uniq Study Club · Where studying feels like a luxury.
        </footer>
      </div>
    )
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <h1 className="logo">Uniq Study Club</h1>
        <ul className="nav-links">
          <li><a href="#willkommen">Start</a></li>
          <li><a href="#club">Der Club</a></li>
          <li><a href="#raum">Der Raum</a></li>
          <li><a href="#login">Einloggen</a></li>
        </ul>
      </nav>

      {/* HERO – WILLKOMMEN */}
      <section className="hero-willkommen" id="willkommen">
        <h2>Herzlich Willkommen.</h2>
        <p className="hero-sub">Ich freue mich wirklich sehr, dass du hier bist.</p>
        <p className="hero-sub">
          Nimm dir einen Moment nur für dich, atme kurz durch und fühl dich willkommen. 🤍
        </p>
        <p className="hero-gold">Schön, dass du da bist.</p>
      </section>

      {/* DER CLUB */}
      <section className="club-sektion" id="club">
        <div className="club-bilder">
          <img
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop"
            alt="Studieren"
            className="club-bild"
          />
          <img
            src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop"
            alt="Schreibtisch"
            className="club-bild"
          />
        </div>
        <div className="club-text">
          <h3>Der Club</h3>
          <p>
            Der <strong>Uniq Study Club</strong> ist ein digitaler Club für Studenten,
            die sich im Studium manchmal überfordert fühlen und sich mehr Klarheit,
            Motivation und Unterstützung wünschen.
          </p>
          <p>
            Kein Druck. Kein Leistungszwang. Einfach Unterstützung, die wirklich hilft.
          </p>
          <blockquote className="zitat">
            „Man darf sich überfordert fühlen. Du bist damit nicht allein.
            Es geht vielen so, auch wenn man es nicht sieht."
          </blockquote>
          <p className="gold-text">Hier bist du herzlichst willkommen, so wie du bist. 🤍</p>
        </div>
      </section>

      {/* TRENNER */}
      <div className="trenner">
        <p>Du bist nicht allein. Und du musst auch nicht alles alleine lösen.</p>
      </div>

      {/* DER RAUM */}
      <section className="raum-sektion" id="raum">
        <div className="raum-text">
          <h3>Ein ruhiger Ort für dich</h3>
          <p>Manchmal braucht man keinen neuen Plan, sondern einen ruhigen Moment.</p>
          <p>Einen Platz, an dem niemand etwas erwartet. Ganz in deinem Tempo.</p>
          <blockquote className="zitat">„Wachstum beginnt dort, wo es still wird."</blockquote>
          <button className="cta-button" onClick={() => document.getElementById('login').scrollIntoView()}>
            Raum betreten
          </button>
        </div>
        <div className="raum-bilder">
          <img
            src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop"
            alt="Ruhiger Ort"
            className="raum-bild"
          />
        </div>
      </section>

      {/* E-MAIL ABO */}
      <section className="email-sektion">
        <div className="email-content">
          <h3>Updates per Mail <span>🤍</span></h3>
          <p>Wenn du Lust hast, kannst du hier deine E-Mail-Adresse dalassen.</p>
          <p>Ich schicke dir nur gelegentlich Updates – ohne Spam, ohne Druck.</p>
          <p>Wenn du dich nicht einträgst, ist das natürlich völlig okay. 🤍</p>
          <div className="email-form">
            <input
              className="auth-input"
              type="email"
              placeholder="Deine E-Mail Adresse"
            />
            <button className="cta-button">Dabei sein ✨</button>
          </div>
          <p className="gold-text">Ich freue mich auf dich. :)</p>
        </div>
      </section>

      {/* LOGIN */}
      <section id="login">
        <Auth />
      </section>

      <footer className="footer">
        © 2026 Uniq Study Club · Where studying feels like a luxury.
      </footer>
    </div>
  )
}

export default App