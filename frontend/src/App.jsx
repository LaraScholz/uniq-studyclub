import './App.css';
import Chat from './components/Chat';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo">Unique Studyclub</h1>
        <p className="tagline">Where studying feels like a luxury.</p>
      </nav>

      <main>
        <Chat />
      </main>
    </div>
  );
}

export default App;
