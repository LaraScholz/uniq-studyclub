import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

function Community({ nutzer }) {
  const [posts, setPosts] = useState([])
  const [neuerPost, setNeuerPost] = useState('')
  const [laden, setLaden] = useState(false)
  const [meinName, setMeinName] = useState('')

  useEffect(() => {
    postsLaden()
    nameLaden()
  }, [])

  const nameLaden = async () => {
    const { data } = await supabase
      .from('profile')
      .select('nutzername')
      .eq('user_id', nutzer.id)
      .single()
    if (data) setMeinName(data.nutzername)
  }

  const postsLaden = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts(data || [])
  }

  const postErstellen = async () => {
    if (!neuerPost.trim()) return
    setLaden(true)

    await supabase.from('posts').insert({
      inhalt: neuerPost,
      author_email: meinName || 'Anonym'
    })

    setNeuerPost('')
    await postsLaden()
    setLaden(false)
  }

  return (
    <div className="community-container">
      <h2 className="community-title">Community</h2>
      <p className="community-subtitle">Frag. Teile. Wachse. 🤍</p>

      <div className="post-erstellen">
        <textarea
          className="chat-input"
          placeholder="Stell eine Frage oder teile einen Gedanken..."
          value={neuerPost}
          onChange={(e) => setNeuerPost(e.target.value)}
          rows={3}
        />
        <button
          className="cta-button"
          onClick={postErstellen}
          disabled={laden}
        >
          {laden ? 'Wird gepostet...' : 'Teilen ✨'}
        </button>
      </div>

      <div className="posts-liste">
        {posts.length === 0 && (
          <p className="keine-posts">Noch keine Beiträge. Sei der Erste! 🌟</p>
        )}
        {posts.map((post) => (
          <div key={post.id} className="post-karte">
            <p className="post-autor">✨ {post.author_email}</p>
            <p className="post-inhalt">{post.inhalt}</p>
            <p className="post-datum">
              {new Date(post.created_at).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community
