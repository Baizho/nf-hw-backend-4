import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useSong } from "../../context/SongContext";

const UploadForm = () => {
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
    console.log(e.target.files);
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
      setMessage(`File uploaded successfully: ${response.data.url}`);
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
  };

  return (
    <div>
      <h1>Upload MP3</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Song Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label>Artist Name:</label>
          <input
            type="text"
            value={artist}
            onChange={handleArtistChange}
            required
          />
        </div>
        <div>
          <label>MP3 File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="audio/mpeg"
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;
