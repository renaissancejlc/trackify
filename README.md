📄 README.md

# 🎵 Trackify

Trackify is an interactive, music-personality app that uses your Spotify data to create fun, visual experiences like:

- 🎭 **Spirit Animal**: Discover your musical spirit animal based on your top tracks
- 🎨 **Poster Generator**: Create a movie or concert-style poster from your favorite songs
- 🔮 **Tarot Reading**: Get a tarot-inspired reading from your top albums
- 🎮 **Guess the Album**: Play a game guessing blurred album covers

---

## 🚀 Tech Stack

- **React + Vite** (Frontend Framework)
- **TailwindCSS v4** (UI Styling)
- **Spotify Web API** (OAuth + music data)
- **Glassmorphic + Neumorphic Design** (Custom Tailwind theme)

---

## 🛠 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/trackify.git
cd trackify
npm install


⸻

2. Configure Spotify OAuth

🔑 Create a Spotify App:
	•	Go to Spotify Developer Dashboard
	•	Click Create App
	•	Add a Redirect URI (e.g. from ngrok or Vercel)

✏️ In src/pages/Home.jsx, replace:

const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';
const REDIRECT_URI = 'YOUR_REDIRECT_URI'; // Must match what's in Spotify dashboard


⸻

3. (Optional) Run with Ngrok for HTTPS

ngrok http 5173

	•	Copy the HTTPS URL (e.g. https://your-ngrok-url.ngrok-free.app)
	•	Add it to the Spotify app’s Redirect URIs
	•	Replace REDIRECT_URI in Home.jsx

⸻

4. Run the App Locally

npm run dev

Visit http://localhost:5173 or your ngrok URL.

⸻

✅ Features Completed
	•	Spotify OAuth login
	•	Fetch top tracks and audio features
	•	Spirit animal logic
	•	Tailwind v4 styling with neumorphic/glassmorphic UI

⸻

📌 Planned Features
	•	Custom poster generator (top tracks → movie or concert poster)
	•	Tarot visual card flips
	•	Album art guessing game (blur logic + timer)
	•	Profile settings (light/dark mode, export results)

⸻

🧑‍💻 Contributing

Pull requests are welcome! Please open an issue first for any major changes.

⸻

📜 License

MIT License © 2025 Reny Carr

⸻

✨ Credits

Made with ❤️ using React, Spotify, and Tailwind.
