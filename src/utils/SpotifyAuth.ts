// src/utils/spotifyAuth.ts

const CLIENT_ID = '7db6372c56de40f2b4a7902ed5c0f931';
const REDIRECT_URI = 'https://localhost:5173/callback'; // Or your deployed URL
const SCOPES = [
  'user-top-read',
  'user-read-private',
  'user-read-email',
];

export const loginWithSpotify = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${SCOPES.join('%20')}`;

  window.location.href = authUrl;
};