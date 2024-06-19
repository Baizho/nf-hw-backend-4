import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:4000/api/v1";

const basic = {
  id: "",
  username: "",
  img: "https://ik.imagekit.io/8cs4gpobr/spotify/users/default.jpg",
  likedSongs: [],
  playlists: [],
  token: "",
  refreshToken: "",
};

const AuthContext = React.createContext(undefined);

const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within a BooksProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(basic);

  const registerUser = async (username, password) => {
    console.log("Registering User");
    try {
      const res = await axios.post(`${SERVER_URL}` + "/register", {
        username: username,
        password: password,
      });
      window.localStorage.setItem("spotify-user-username", null);
      return res.data.message;
    } catch (err) {
      return err.response.data.message;
    }
  };

  const Logout = () => {
    setUser(basic);
    window.localStorage.setItem("spotify-user-username", null);
  };

  const loginUser = async (username, password) => {
    console.log("Logging User");
    try {
      const res = await axios.post(`${SERVER_URL}` + "/login", {
        username: username,
        password: password,
      });
      const data = res.data.result;
      // console.log(data);
      setUser({
        id: data.user._id,
        username: data.user.username,
        img: "https://ik.imagekit.io/8cs4gpobr/spotify/users/default.jpg",
        likedSongs: data.likedSongs,
        playlists: data.playlists,
        token: data.accessToken,
        refreshToken: data.refreshToken,
      });
      // console.log(data.accessToken);
      window.localStorage.setItem("spotify-user-username", data.accessToken);
      return res.data.message;
    } catch (err) {
      return err.response.data.message;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, registerUser, loginUser, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useUser };
