import React, { useEffect, useState } from "react";
import { useUser } from "../../context/AuthContext";
import { useSong } from "../../context/SongContext";
import { useNavigate } from "react-router-dom";
import PlayerBar from "../../components/PlayerBar";
import { getLikedSongs, unlikeSong } from "../../services/api";
import { RiHeartFill } from "react-icons/ri";
import { RiHeartLine } from "react-icons/ri";

const FavoriteSongs = () => {
  const { user } = useUser();
  const { curSong, playSong } = useSong();
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLikedSongs = async () => {
    try {
      const likedSongs = await getLikedSongs(user.username);

      setSongs(likedSongs);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUnlikeSong = async (songId) => {
    try {
      const listSongs = await unlikeSong(user.username, songId);
      setSongs(listSongs);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user.username === "") {
      alert("sign in first");
      navigate("/signin");
    }
    fetchLikedSongs();
  });

  if (loading) {
    return (
      <div className="text-center text-white text-xl mt-10">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Favorite Songs</h1>
      <div className="flex flex-col">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-gray-800 p-4 rounded-lg flex items-center w-full"
          >
            <img
              src={song.img}
              alt={song.name}
              className="w-16 h-16 rounded mr-4"
            />
            <div className="w-full">
              <h2 className="text-xl font-semibold w-full">{song.name}</h2>
              <p className="text-gray-400 w-full">{song.artist}</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  playSong(song);
                }}
                className="bg-green-700 hover:bg-green-800 text-gray-300 mx-4 py-2 rounded mt-2 w-16 h-10"
              >
                Play
              </button>
              <button
                onClick={() => handleUnlikeSong(song._id)}
                className="flex items-center h-10 mr-4"
              >
                <RiHeartFill className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {curSong.name && <PlayerBar song={curSong} />}
    </div>
  );
};

export default FavoriteSongs;
