// src/pages/Callback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const token = hashParams.get('access_token');

    if (token) {
      localStorage.setItem('spotify_access_token', token);
      navigate('/'); // or wherever you want to redirect
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default Callback;