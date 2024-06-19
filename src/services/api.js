import axios from "axios";

const API_URL = "http://localhost:4000/api/v1";

const getLikedSongs = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/liked-songs`, {
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    throw error;
  }
};

const unlikeSong = async (username, songId) => {
  try {
    const response = await axios.post(`${API_URL}/songs/unlike`, {
      username,
      songId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    throw error;
  }
}

const checkToken = async (userToken) => {
  try {
    const res = await axios.post(`${API_URL}/checkToken`, {
      token: userToken,
    })
    return res;
  } catch (error) {
    console.log("error checking token");
    throw error;
  }
}

const getUserById = async (userId) => {
  try {
    const res = await axios.post(`${API_URL}/getUser`, {
      userId: userId,
    });
    // console.log("got res", res);
    return res;
  } catch (error) {
    console.log("error getting user");
    throw error;
  }
}

const getAllSongs = async () => {
  try {
    const res = await axios.get(`${API_URL}/songs`);
    return res;
  } catch (error) {
    console.log("error getting songs");
    throw error;
  }
}

const likeSong = async (username, songId) => {
  try {
    const res = await axios.post(`${API_URL}/songs/like`, {
      username,
      songId,
    });
    return res;
  } catch (error) {
    console.log("error liking song");
    throw error;
  }
}

export { getLikedSongs, unlikeSong, checkToken, getUserById, getAllSongs, likeSong };
