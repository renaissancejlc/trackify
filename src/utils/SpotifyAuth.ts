// src/utils/spotifyAuth.ts
// src/utils/spotifyAuth.ts
function generateCodeVerifier(length = 128) {
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + (dec % 36).toString(36)).slice(-1)).join('');
}

async function generateCodeChallenge(codeVerifier: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export const loginWithSpotify = async () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  localStorage.setItem('spotify_code_verifier', codeVerifier);

  const SCOPES = [
    'user-top-read',
    'user-read-private',
    'user-read-email',
  ];

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${SCOPES.join('%20')}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

  window.location.href = authUrl;
};

// const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
// const SCOPES = [
//   'user-top-read',
//   'user-read-private',
//   'user-read-email',
// ];

// export const loginWithSpotify = () => {
//   const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
//     REDIRECT_URI
//   )}&scope=${SCOPES.join('%20')}`;
//   console.log("CLIENT_ID from env:", CLIENT_ID);
//   console.log("Auth URL:", authUrl);

//   window.location.href = authUrl;
// };