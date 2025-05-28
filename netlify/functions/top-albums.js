// netlify/functions/top-artists.js

export async function handler(event, context) {
  const accessToken = event.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Missing access token" }),
    };
  }

  try {
    const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=50", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    const artists = data.items.map((artist) => ({
      id: artist.id,
      name: artist.name,
      image: artist.images?.[0]?.url || "",
      genres: artist.genres || [],
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ items: artists }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Spotify request failed", detail: err.message }),
    };
  }
}