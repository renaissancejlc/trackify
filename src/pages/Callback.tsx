// src/pages/Callback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const codeVerifier = localStorage.getItem('spotify_code_verifier');

    if (code && codeVerifier) {
      fetchAccessToken(code, codeVerifier);
    } else {
      console.error('Missing code or code_verifier');
    }

    async function fetchAccessToken(code: string, codeVerifier: string) {
      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
          grant_type: 'authorization_code',
          code,
          redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
          code_verifier: codeVerifier,
        }),
      });

      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem('spotify_access_token', data.access_token);
        navigate('/'); // or your home screen
      } else {
        console.error('Token exchange failed', data);
      }
    }
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to bottom, #1db954, #121212)',
      color: '#fff',
      fontFamily: "'Circular Std', sans-serif",
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        fontSize: '2rem',
        marginBottom: '1rem',
        animation: 'pulse 2s infinite'
      }}>
        🌥️ Connecting you to the cloud...
      </div>
      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
        Hold tight while we complete your Spotify authentication.
      </p>
      <p style={{ fontSize: '1rem' }}>
        If this takes more than 10 seconds, you may need to return and sign in again.
      </p>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Callback;