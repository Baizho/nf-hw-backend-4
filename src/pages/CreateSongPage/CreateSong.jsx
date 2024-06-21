import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useSong } from "../../context/SongContext";

const CreateSong = () => {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [message, setMessage] = useState("");
  const { addSong } = useSong();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleImageChange = (e) => {
    // console.log(e.target.files);
    if (e.target.files) {
      setImg(e.target.files[0]);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submiitted");
    setMessage("File is uploading");

    if (!file || !title || !artist || !img) {
      setMessage("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("artist", artist);

    const song = {
      name: "",
      artist: "",
      song: "",
      img: "",
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/upload-mp3",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(`File uploaded successfully`);
      song.name = title;
      song.artist = artist;
      song.song = response.data.url;
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload file");
    }

    const formImage = new FormData();
    formImage.append("image", img);
    try {
      const response = await axios.post(
        "http://localhost:4000/upload-image",
        formImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      song.img = response.data.url;
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload file");
    }

    addSong(song.name, song.artist, song.song, song.img);
    setArtist("");
    setTitle("");
    setFile(null);
    setImg(null);
  };

  return (
    <div>
      <h1 className="text-center text-2xl mb-3">Upload MP3</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-y-4"
      >
        <div className="text-xl">
          <label>Song Title:</label>
          <input
            type="text"
            className="rounded-lg bg-gray-300 ml-4 text-black px-2"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="text-xl">
          <label>Artist Name:</label>
          <input
            type="text"
            className="rounded-lg bg-gray-300 ml-4 text-black px-2"
            value={artist}
            onChange={handleArtistChange}
            required
          />
        </div>
        <div className="text-xl">
          <label>MP3 File:</label>
          <input
            type="file"
            name="music"
            className="file:bg-gray-300 text-base ml-4"
            onChange={handleFileChange}
            accept="audio/mpeg"
            required
          />
        </div>
        <div className="text-xl">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            className="file:bg-gray-300 text-base ml-4"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="bg-green-600 rounded px-4 py-2 ">
          Upload
        </button>
      </form>
      {message && <p className="text-center">{message}</p>}
    </div>
  );
};

export default CreateSong;
