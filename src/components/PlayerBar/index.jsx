import React, { useRef, useState, useEffect } from "react";

const PlayerBar = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // console.log(song);
    if (audioRef.current) {
      audioRef.current.src = song.song; // Assuming song.song is the URL of the audio file
      audioRef.current.addEventListener("timeupdate", updateTime); // Update time as audio plays
      audioRef.current.addEventListener("ended", handleEnded); // Handle end of song
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, [song]);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="player-bar fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={song.img}
          alt={song.name}
          className="w-16 h-16 rounded mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold">{song.name}</h2>
          <p className="text-gray-400">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center">
        <audio ref={audioRef} preload="auto"></audio>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full mr-4"
          onClick={playPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="flex items-center text-gray-400">
          <span className="mr-2">{formatTime(currentTime)}</span> /{" "}
          <span className="ml-2">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
