import { useState, useEffect } from 'react'
import './App.css'
import Chat from './components/Chat'
import Auth from './components/Auth'
import { supabase } from './supabase'

function App() {
  const [nutzer, setNutzer] = useState(null)

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
              <li><span className="nav-email">{nutzer.email}</span></li>
              <li><a href="#" onClick={ausloggen}>Ausloggen</a></li>
            </>
          ) : (
            <>
              <li><a href="#">Lernen</a></li>
              <li><a href="#">Community</a></li>
            </>
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

      {nutzer ? <Chat /> : <Auth />}

      <footer className="footer">
        © 2026 Uniq Study Club · Where studying feels like a luxury.
      </footer>
    </div>
  )
}

export default App
