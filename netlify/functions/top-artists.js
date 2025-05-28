import fetch from 'node-fetch';
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const token = event.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Missing access token" }),
    };
  }

  try {
    const limit = event.queryStringParameters?.limit || 50;

    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch top artists" }),
      };
    }

    const data = await response.json();
    const items = data.items.map((artist) => ({
      name: artist.name || "Unknown Artist",
      image: artist.images?.[0]?.url || "",
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ items }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message }),
    };
  }
};