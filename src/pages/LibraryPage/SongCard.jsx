import React from "react";
import { useSong } from "../../context/SongContext";
import { useUser } from "../../context/AuthContext";
import PlayerBar from "../../components/PlayerBar";

const SongCard = ({ song, onLike, onDislike, onAddToPlaylist }) => {
  const { curSong, playSong } = useSong();
  const { user } = useUser();
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between">
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
        className="bg-green-500 hover:bg-green-600 text-white py-2 rounded mt-2"
      >
        Play
      </button>
      {user.username && (
        <div className="flex justify-between mt-4">
          {user.likedSongs.find((item) => item === song._id) ? (
            <button
              onClick={() => onLike(song._id)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
            >
              Like
            </button>
          ) : (
            <button
              onClick={() => onDislike(song._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
            >
              Dislike
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
