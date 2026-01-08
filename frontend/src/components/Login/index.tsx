import React, { useState } from 'react';
import { 
  Container, 
  LoginForm, 
  Header, 
  Title, 
  Subtitle, 
  Input, 
  ErrorMessage, 
  Button 
} from './components';

interface LoginProps {
  onLogin: (token: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.DEV ? 'http://127.0.0.1:8000/api-token-auth/' : '/api-token-auth/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Zugangsdaten ungültig');
      }

      const data = await response.json();
      onLogin(data.token);

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Login fehlgeschlagen';
        setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Header>
          <Title>Login</Title>
          <Subtitle>Bitte einloggen</Subtitle>
        </Header>

        <Input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />

        <Input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Prüfe...' : 'Anmelden'}
        </Button>
      </LoginForm>
    </Container>
  );
};
