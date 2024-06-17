import React, { useContext, useState } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:4000/api/v1";

const basic = {
  name: "",
  artist: "",
  song: "",
  img: "",
};

const SongContext = React.createContext(undefined);

const useSong = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useUser must be used within a BooksProvider");
  }
  return context;
};

const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([basic]);

  const addSong = async (name, artist, song, img) => {
    console.log("adding a song");
    try {
      const res = await axios.post(`${SERVER_URL}` + "/addSong", {
        name: name,
        artist: artist,
        song: song,
        img: img,
      });
      return res.data.message;
    } catch (err) {
      return err.response.data.message;
    }
  };

  return (
    <SongContext.Provider value={{ songs, addSong }}>
      {children}
    </SongContext.Provider>
  );
};

export { SongProvider, useSong };
