import React, { createContext, useContext, useEffect, useState } from "react";

interface SpotifyUserProfile {
  display_name: string;
  email: string;
  images: { url: string }[];
  id: string;
}

interface SpotifyArtist {
  name: string;
  id: string;
  images: { url: string }[];
  genres: string[];
}

interface SpotifyTrack {
  name: string;
  id: string;
  album: {
    name: string;
    images: { url: string }[];
  };
  artists: { name: string }[];
}

interface SpotifyData {
  profile: SpotifyUserProfile | null;
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  loading: boolean;
  error: string | null;
}

const SpotifyDataContext = createContext<SpotifyData>({
  profile: null,
  topTracks: [],
  topArtists: [],
  loading: true,
  error: null,
});

export const useSpotifyData = () => useContext(SpotifyDataContext);

export const SpotifyDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<SpotifyUserProfile | null>(null);
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) {
      setError("No access token found.");
      setLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchData = async () => {
      try {
        const [profileRes, tracksRes, artistsRes] = await Promise.all([
          fetch("https://api.spotify.com/v1/me", { headers }),
          fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", { headers }),
          fetch("https://api.spotify.com/v1/me/top/artists?limit=10", { headers }),
        ]);

        if (!profileRes.ok || !tracksRes.ok || !artistsRes.ok) {
          throw new Error("One or more Spotify API calls failed.");
        }

        const profileData = await profileRes.json();
        const tracksData = await tracksRes.json();
        const artistsData = await artistsRes.json();

        setProfile(profileData);
        setTopTracks(tracksData.items);
        setTopArtists(artistsData.items);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Unknown error");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SpotifyDataContext.Provider value={{ profile, topTracks, topArtists, loading, error }}>
      {children}
    </SpotifyDataContext.Provider>
  );
};