
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  const [name, setName] = useState('');
  const [averageScore, setAverageScore] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('https://webapp-qhil.onrender.com/api/player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, averageScore: Number(averageScore) })
      });
      if (response.ok) {
        setMessage('Player added successfully!');
        setName('');
        setAverageScore('');
      } else {
        const data = await response.json();
        setMessage('Error: ' + (data.error || 'Failed to add player'));
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Add Player</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '300px' }}>
          <input
            type="text"
            placeholder="Player Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Average Score"
            value={averageScore}
            onChange={e => setAverageScore(e.target.value)}
            required
            min="0"
            step="any"
          />
          <button type="submit">Add Player</button>
        </form>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default App;
