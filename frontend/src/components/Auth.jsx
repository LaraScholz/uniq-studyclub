import { useState } from 'react'
import { supabase } from '../supabase'

function Auth() {
  const [email, setEmail] = useState('')
  const [passwort, setPasswort] = useState('')
  const [nutzername, setNutzername] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [laden, setLaden] = useState(false)
  const [nachricht, setNachricht] = useState('')

  const handleSubmit = async () => {
    setLaden(true)
    setNachricht('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: passwort
      })
      if (error) setNachricht(error.message)
    } else {
      if (!nutzername.trim()) {
        setNachricht('Bitte wähle einen Benutzernamen.')
        setLaden(false)
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password: passwort
      })

      if (error) {
        setNachricht(error.message)
      } else {
        await supabase.from('profile').insert({
          user_id: data.user.id,
          nutzername: nutzername.trim()
        })
        setNachricht('Willkommen! Du kannst dich jetzt einloggen. 🤍')
        setIsLogin(true)
      }
    }
    setLaden(false)
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">
        {isLogin ? 'Willkommen zurück.' : 'Werde Teil des Clubs.'}
      </h2>
      <p className="auth-subtitle">
        {isLogin ? 'Schön dass du wieder da bist. 🤍' : 'Dein Platz wartet auf dich.'}
      </p>

      {!isLogin && (
        <input
          className="auth-input"
          type="text"
          placeholder="Benutzername (wird öffentlich angezeigt)"
          value={nutzername}
          onChange={(e) => setNutzername(e.target.value)}
        />
      )}

      <input
        className="auth-input"
        type="email"
        placeholder="E-Mail Adresse"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="auth-input"
        type="password"
        placeholder="Passwort"
        value={passwort}
        onChange={(e) => setPasswort(e.target.value)}
      />

      {nachricht && (
        <p className="auth-nachricht">{nachricht}</p>
      )}

      <button
        className="cta-button"
        onClick={handleSubmit}
        disabled={laden}
      >
        {laden ? 'Moment...' : isLogin ? 'Einloggen' : 'Registrieren'}
      </button>

      <p className="auth-switch">
        {isLogin ? 'Noch kein Account? ' : 'Schon dabei? '}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Jetzt registrieren' : 'Einloggen'}
        </span>
      </p>
    </div>
  )
}

export default Auth
