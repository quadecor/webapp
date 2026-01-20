
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';



  // Auth state
  const [authMode, setAuthMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Player state
  const [name, setName] = useState('');
  const [averageScore, setAverageScore] = useState('');
  const [message, setMessage] = useState('');

  // Auth handlers
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthMessage('');
    const url = authMode === 'login'
      ? 'https://webapp-qhil.onrender.com/api/auth/login'
      : 'https://webapp-qhil.onrender.com/api/auth/register';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        if (authMode === 'login') {
          setAuthMessage('Login successful!');
          setToken(data.token);
          localStorage.setItem('token', data.token);
        } else {
          setAuthMessage('Registration successful! You can now log in.');
          setAuthMode('login');
        }
        setUsername('');
        setPassword('');
      } else {
        setAuthMessage('Error: ' + (data.error || 'Failed'));
      }
    } catch (err) {
      setAuthMessage('Error: ' + err.message);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setAuthMessage('Logged out.');
  };

  // Player submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('https://webapp-qhil.onrender.com/api/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
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
        <h2>Authentication</h2>
        {token ? (
          <>
            <p>Logged in! <button onClick={handleLogout}>Logout</button></p>
          </>
        ) : (
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '300px', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" onClick={() => setAuthMode('login')}>Login</button>
              <button type="button" onClick={() => setAuthMode('register')}>Register</button>
            </div>
            {authMessage && <p>{authMessage}</p>}
          </form>
        )}

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
