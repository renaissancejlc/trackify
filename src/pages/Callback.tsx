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

  return <p>Authenticating with Spotify...</p>;
};

export default Callback;