// netlify/functions/audio-features.js

export async function handler(event) {
  const accessToken = event.headers.authorization?.split(" ")[1];
  const trackId = event.queryStringParameters?.trackId;

  if (!accessToken || !trackId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing token or track ID" }),
    };
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch audio features" }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: err.message }),
    };
  }
}