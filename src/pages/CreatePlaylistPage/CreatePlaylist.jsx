import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSong } from "../../context/SongContext";
import { useUser } from "../../context/AuthContext";

const CreateSong = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { addSong } = useSong();
  const navigate = useNavigate();
  const { user, createPlaylist } = useUser();

  useEffect(() => {
    if (user.username === "") {
      alert("sign in first");
      navigate("/signin");
    }
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    const response = await createPlaylist(title);
    console.log(response);
    setMessage("Playlist added");
  };

  return (
    <div className="h-[300px]">
      <h1 className="text-center text-2xl mb-3">Upload MP3</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-y-4"
      >
        <div className="text-xl">
          <label>Playlist title:</label>
          <input
            type="text"
            className="rounded-lg bg-gray-300 ml-4 text-black px-2"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <button type="submit" className="bg-green-600 rounded px-4 py-2 ">
          Add playlist
        </button>
      </form>
      {message && <p className="text-center">{message}</p>}
    </div>
  );
};

export default CreateSong;
