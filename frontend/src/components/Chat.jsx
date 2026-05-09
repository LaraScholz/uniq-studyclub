import { useState } from 'react';

function Chat() {
const [frage, setFrage] = useState('');
const [antwort, setAntwort] = useState('');
const [laden, setLaden] = useState(false);

const frageStellen = async () => {
    if (!frage.trim()) return;
    setLaden(true);
    setAntwort('');

    const response = await fetch(
    `http://localhost:8000/frage?frage=${encodeURIComponent(frage)}`,
    { method: 'POST' }
    );
    const data = await response.json();
    setAntwort(data.antwort);
    setLaden(false);
};

return (
    <div className="chat-container">
    <h2>Dein KI-Tutor</h2>
    <p className="chat-subtitle">Frag alles. Verstehe wirklich.</p>

    <textarea
        className="chat-input"
        placeholder="z.B. Erkläre mir die Relativitätstheorie..."
        value={frage}
        onChange={(e) => setFrage(e.target.value)}
        rows={4}
    />

    <button
        className="cta-button"
        onClick={frageStellen}
        disabled={laden}
    >
        {laden ? 'Denkt nach...' : 'Frage stellen ✨'}
    </button>

    {antwort && (
        <div className="antwort-box">
        <p>{antwort}</p>
        </div>
    )}
    </div>
);
}

export default Chat;
