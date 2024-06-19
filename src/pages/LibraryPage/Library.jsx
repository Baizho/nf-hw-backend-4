import React, { useState, useEffect } from "react";
import axios from "axios";
import SongCard from "./SongCard";
import { useUser } from "../../context/AuthContext";
import { getAllSongs, unlikeSong } from "../../services/api";
import { likeSong } from "../../services/api";

const Library = ({ username }) => {
  const { user } = useUser();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await getAllSongs();
        setSongs(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const CardLikeSong = async (songId) => {
    try {
      await likeSong(user.username, songId);
    } catch (error) {
      console.error("Error liking song:", error);
      // Handle error as needed
    }
  };

  const CardDislikeSong = async (songId) => {
    try {
      await unlikeSong(user.username, songId);
    } catch (error) {
      console.error("Error Disliking song:", error);
      // Handle error as needed
    }
  };

  const addToPlaylist = async (songId) => {
    try {
      console.log("add to playlist");
      // Implement adding to playlist logic
    } catch (error) {
      console.error("Error adding to playlist:", error);
      // Handle error as needed
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => {
          if (user.like)
            return (
              <SongCard
                key={song._id}
                song={song}
                onLike={CardLikeSong}
                onDislike={CardDislikeSong}
                onAddToPlaylist={addToPlaylist}
              />
            );
        })}
      </div>
    </div>
  );
};

export default Library;
