
import { Track } from '../types/Track'
export const fetchTopTracks = async (token: string): Promise<Track[]> => {
  const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=20', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch top tracks');
  }

  const data = await res.json();

  return data.items;
};