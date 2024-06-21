import React from "react";
import { useState } from "react";
import { useSong } from "../../context/SongContext";
import { useUser } from "../../context/AuthContext";
import PlayerBar from "../../components/PlayerBar";
import { unlikeSong, likeSong } from "../../services/api";
import { RiHeartLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";

const SongCard = ({ song }) => {
  const { curSong, playSong } = useSong();
  const { user } = useUser();
  const mem = user.likedSongs.find((item) => item === song.id) ? true : false;
  const [liked, setLiked] = useState(mem);

  const onLike = async (songId) => {
    try {
      await likeSong(user.username, songId);
      setLiked(true);
    } catch (error) {
      console.error("Error liking song:", error);
      // Handle error as needed
    }
  };

  const onDislike = async (songId) => {
    try {
      await unlikeSong(user.username, songId);
      setLiked(false);
    } catch (error) {
      console.error("Error Disliking song:", error);
      // Handle error as needed
    }
  };

  const onAddToPlaylist = async (songId) => {
    try {
      console.log("add to playlist");
      // Implement adding to playlist logic
    } catch (error) {
      console.error("Error adding to playlist:", error);
      // Handle error as needed
    }
  };

  return (
    <div className="bg-black p-4 rounded-lg shadow-md flex flex-col justify-between  text-white">
      <div className="h-[70%]">
        <img
          src={song.img}
          alt={song.name}
          className="w-full h-[70%] rounded mb-2"
        />
        <h2 className="text-xl font-semibold h-[15%]">{song.name}</h2>
        <p className="text-gray-400 h-[15%]">{song.artist}</p>
      </div>
      <button
        onClick={() => {
          playSong(song);
        }}
        className="bg-green-500 hover:bg-green-600 text-white py-2 rounded mt-2 w-16"
      >
        Play
      </button>
      {user.username && (
        <div className="flex justify-between mt-4">
          {liked ? (
            <button
              onClick={() => onDislike(song._id)}
              className=" text-white px-4 py-2 rounded mr-2"
            >
              <RiHeartFill />
            </button>
          ) : (
            <button
              onClick={() => onLike(song._id)}
              className=" text-white px-4 py-2 rounded mr-2"
            >
              <RiHeartLine />
            </button>
          )}
          <button
            onClick={() => onAddToPlaylist(song._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to Playlist
          </button>
        </div>
      )}
      {curSong.name && <PlayerBar song={curSong} />}
    </div>
  );
};

export default SongCard;
