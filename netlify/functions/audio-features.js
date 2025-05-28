const https = require("https");
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
    const audioFeaturesUrl = `https://api.spotify.com/v1/audio-features/${trackId}`;

    const data = await new Promise((resolve, reject) => {
      const req = https.get(audioFeaturesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }, (res) => {
        let body = "";
        res.on("data", chunk => body += chunk);
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch (err) {
              reject(new Error("Failed to parse JSON response"));
            }
          } else {
            reject(new Error(`Failed to fetch audio features: ${res.statusCode}`));
          }
        });
      });

      req.on("error", reject);
    });

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