
export async function handler(event, context) {
  const accessToken = event.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Missing access token" }),
    };
  }

  try {
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    const albumsMap = new Map();

    data.items.forEach((track) => {
      const album = track.album;
      if (!albumsMap.has(album.id)) {
        albumsMap.set(album.id, {
          id: album.id,
          name: album.name,
          image: album.images?.[0]?.url || "",
          artist: album.artists?.[0]?.name || "Unknown Artist",
        });
      }
    });

    const albums = Array.from(albumsMap.values());

    return {
      statusCode: 200,
      body: JSON.stringify({ items: albums }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Spotify request failed", detail: err.message }),
    };
  }
}