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

  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo">Uniq Study Club</h1>
        <ul className="nav-links">
          {nutzer ? (
            <>
              <li>
                <a
                  href="#"
                  onClick={() => setAktiveSeite('lernen')}
                  style={{ color: aktiveSeite === 'lernen' ? '#C4A55A' : '' }}
                >
                  Lernen
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setAktiveSeite('community')}
                  style={{ color: aktiveSeite === 'community' ? '#C4A55A' : '' }}
                >
                  Community
                </a>
              </li>
              <li><a href="#" onClick={ausloggen}>Ausloggen</a></li>
            </>
          ) : (
            <li><a href="#">Uniq Study Club</a></li>
          )}
        </ul>
      </nav>

      <section className="hero">
        <h2>Herzlich Willkommen.</h2>
        <p className="hero-sub">
          Nimm dir einen Moment nur für dich, atme kurz durch und fühl dich willkommen. 🤍
        </p>
        <p className="hero-gold">Schön, dass du da bist.</p>
      </section>

      {!nutzer && <Auth />}
      {nutzer && aktiveSeite === 'lernen' && <Chat />}
      {nutzer && aktiveSeite === 'community' && <Community nutzer={nutzer} />}

      <footer className="footer">
        © 2026 Uniq Study Club · Where studying feels like a luxury.
      </footer>
    </div>
  )
}

export default App
