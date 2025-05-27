// src/utils/spotifyAuth.ts

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SCOPES = [
  'user-top-read',
  'user-read-private',
  'user-read-email',
];

export const loginWithSpotify = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${SCOPES.join('%20')}`;
  console.log("CLIENT_ID from env:", CLIENT_ID);
  console.log("Auth URL:", authUrl);

  window.location.href = authUrl;
};