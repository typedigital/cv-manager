import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const CORRECT_HASH = import.meta.env.VITE_PASSWORD_HASH || undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (hashHex === CORRECT_HASH) {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--primary-color)', color: 'white'
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex', flexDirection: 'column', gap: '20px', 
        padding: '40px', background: 'white', borderRadius: '8px', 
        color: 'var(--text-color)', width: '100%', maxWidth: '350px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="header-name" style={{fontSize: '1.5em'}}>CV Viewer</h2>
          <p className="job-meta">Bitte authentifizieren</p>
        </div>

        <input
          type="password"
          placeholder="Passwort eingeben"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          style={{
            padding: '12px', borderRadius: '4px', border: '1px solid #ddd',
            fontSize: '1em', fontFamily: 'inherit'
          }}
          autoFocus
        />

        {error && <div style={{ color: '#e74c3c', fontSize: '0.8em', textAlign:'center' }}>Falsches Passwort</div>}

        <button type="submit" className="btn btn-accent" style={{width: '100%'}}>
          Zugang anfordern
        </button>
      </form>
    </div>
  );
};