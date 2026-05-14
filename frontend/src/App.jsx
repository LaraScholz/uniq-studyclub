import { useState, useEffect } from 'react'
import './App.css'
import Chat from './components/Chat'
import Auth from './components/Auth'
import Community from './components/Community'
import { supabase } from './supabase'

function App() {
  const [nutzer, setNutzer] = useState(null)
  const [seite, setSeite] = useState('start')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setNutzer(session?.user ?? null)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setNutzer(session?.user ?? null)
      if (session?.user) setSeite('lernen')
    })
  }, [])

  const ausloggen = async () => {
    await supabase.auth.signOut()
    setSeite('start')
  }

  const Navbar = () => (
    <nav className="navbar">
      <h1 className="logo" onClick={() => setSeite('start')} style={{ cursor: 'pointer' }}>
        Uniq Study Club
      </h1>
      <ul className="nav-links">
        {nutzer ? (
          <>
            <li><a href="#" onClick={() => setSeite('lernen')}
              style={{ color: seite === 'lernen' ? '#C4A55A' : '' }}>Lernen</a></li>
            <li><a href="#" onClick={() => setSeite('community')}
              style={{ color: seite === 'community' ? '#C4A55A' : '' }}>Community</a></li>
            <li><a href="#" onClick={ausloggen}>Ausloggen</a></li>
          </>
        ) : (
          <>
            <li><a href="#" onClick={() => setSeite('start')}>Start</a></li>
            <li><a href="#" onClick={() => setSeite('ueber')}>Der Club</a></li>
            <li><a href="#" onClick={() => setSeite('login')}>Einloggen</a></li>
          </>
        )}
      </ul>
    </nav>
  )

  if (nutzer) {
    return (
      <div className="app">
        <Navbar />
        {seite === 'lernen' && <Chat />}
        {seite === 'community' && <Community nutzer={nutzer} />}
        <footer className="footer">
          © 2026 Uniq Study Club · Where studying feels like a luxury.
        </footer>
      </div>
    )
  }

  if (seite === 'login') {
    return (
      <div className="app">
        <Navbar />
        <div data-aos="fade-up">
          <Auth />
        </div>
        <footer className="footer">
          © 2026 Uniq Study Club · Where studying feels like a luxury.
        </footer>
      </div>
    )
  }

  if (seite === 'ueber') {
    return (
      <div className="app">
        <Navbar />
        <section className="ueber-sektion" data-aos="fade-up">
          <h2>Über den Club</h2>
          <p>
            Der <strong>Uniq Study Club</strong> ist ein digitaler Club für Studenten,
            die sich im Studium manchmal überfordert fühlen.
          </p>
          <p>
            Hier findest du Unterstützung, Motivation und eine Community
            die wirklich versteht wie sich das Studium anfühlt.
          </p>
          <p>Kein Druck. Kein Leistungszwang. Einfach ein ruhiger Ort für dich.</p>
          <blockquote className="zitat">
            „Man darf sich überfordert fühlen. Du bist damit nicht allein."
          </blockquote>
          <button className="cta-button" onClick={() => setSeite('login')}>
            Jetzt dabei sein 🤍
          </button>
        </section>
        <footer className="footer">
          © 2026 Uniq Study Club · Where studying feels like a luxury.
        </footer>
      </div>
    )
  }

  return (
    <div className="app">
      <Navbar />

      <section className="hero-willkommen" id="willkommen" data-aos="fade-up">
        <h2>Herzlich Willkommen.</h2>
        <p className="hero-sub">Ich freue mich wirklich sehr, dass du hier bist.</p>
        <p className="hero-sub">
          Nimm dir einen Moment nur für dich, atme kurz durch und fühl dich willkommen. 🤍
        </p>
        <p className="hero-gold">Schön, dass du da bist.</p>
      </section>

      <section className="club-sektion" id="club">
        <div className="club-bilder" data-aos="fade-right" data-aos-delay="100">
          <img src="/Images/Ipad.jpg" alt="Studieren" className="club-bild" />
          <img src="/Images/Office.jpg" alt="Schreibtisch" className="club-bild" />
        </div>
        <div className="club-text" data-aos="fade-left" data-aos-delay="200">
          <h3>Der Club</h3>
          <p>
            Der <strong>Uniq Study Club</strong> ist ein digitaler Club für Studenten,
            die sich im Studium manchmal überfordert fühlen und sich mehr Klarheit,
            Motivation und Unterstützung wünschen.
          </p>
          <p>Kein Druck. Kein Leistungszwang. Einfach Unterstützung, die wirklich hilft.</p>
          <blockquote className="zitat">
            „Man darf sich überfordert fühlen. Du bist damit nicht allein.
            Es geht vielen so, auch wenn man es nicht sieht."
          </blockquote>
          <p className="gold-text">Hier bist du herzlichst willkommen, so wie du bist. 🤍</p>
          <button className="cta-button" onClick={() => setSeite('ueber')}>
            Mehr über den Club
          </button>
        </div>
      </section>

      <div className="trenner" data-aos="fade-up">
        <p>Du bist nicht allein. Und du musst auch nicht alles alleine lösen.</p>
      </div>

      <section className="raum-sektion" id="raum">
        <div className="raum-text" data-aos="fade-right" data-aos-delay="100">
          <h3>Ein ruhiger Ort für dich</h3>
          <p>Manchmal braucht man keinen neuen Plan, sondern einen ruhigen Moment.</p>
          <p>Einen Platz, an dem niemand etwas erwartet. Ganz in deinem Tempo.</p>
          <blockquote className="zitat">„Wachstum beginnt dort, wo es still wird."</blockquote>
          <button className="cta-button" onClick={() => setSeite('login')}>
            Raum betreten
          </button>
          <img src="/Images/Cozy.jpg" alt="Ruhiger Moment" className="raum-bild-unten" />
        </div>
        <div className="raum-bilder" data-aos="fade-left" data-aos-delay="200">
          <img src="/Images/Seaside.jpg" alt="Ruhiger Ort" className="raum-bild" />
        </div>
      </section>

      <section className="email-sektion" data-aos="fade-up">
        <div className="email-content">
          <h3>Updates per Mail 🤍</h3>
          <p>Wenn du Lust hast, kannst du hier deine E-Mail-Adresse dalassen.</p>
          <p>Ich schicke dir nur gelegentlich Updates – ohne Spam, ohne Druck.</p>
          <div className="email-form">
            <input className="auth-input" type="email" placeholder="Deine E-Mail Adresse" />
            <button className="cta-button">Dabei sein ✨</button>
          </div>
          <p className="gold-text">Ich freue mich auf dich. :)</p>
        </div>
      </section>

      <footer className="footer" data-aos="fade-up">
        © 2026 Uniq Study Club · Where studying feels like a luxury.
      </footer>
    </div>
  )
}

export default App
