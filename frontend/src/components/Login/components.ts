import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color, #171D26); /* Fallback */
  color: white;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  color: var(--text-color, #333);
  width: 100%;
  max-width: 350px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

export const Header = styled.div`
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 1.5em;
  margin: 0;
  text-transform: uppercase;
`;

export const Subtitle = styled.p`
  font-size: 0.85em;
  color: #555;
  margin-bottom: 6px;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  font-family: inherit;
  
  &:focus {
    outline: 2px solid var(--accent-color, #FF5959);
    border-color: transparent;
  }
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.8em;
  text-align: center;
`;

export const Button = styled.button`
  background-color: var(--accent-color, #FF5959);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;
