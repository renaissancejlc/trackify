exports.handler = async function (event) {
  const token = event.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Missing access token" }),
    };
  }

  const trackId = event.queryStringParameters?.trackId;

  if (!trackId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing track ID" }),
    };
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
      body: JSON.stringify({ error: "Server error", details: err.message }),
    };
  }
};