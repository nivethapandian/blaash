import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const updatePlaylistsInDB = async (email, updatedPlaylists) => {
  try {
    const response = await fetch("http://localhost:5000/api/updatePlaylists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, playlists: updatedPlaylists }),
    });

    if (!response.ok) throw new Error("Failed to update playlists");
    console.log("Playlists updated successfully");
  } catch (error) {
    console.error("Error updating playlists:", error);
  }
};

export const AuthProvider = ({ children }) => {
  const [authUrl, setAuthUrl] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const { userEmail } = useUser();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const selectPlaylist = (playlist) => {
    if (selectedPlaylist?.playlistId !== playlist?.playlistId) {
      setSelectedPlaylist(playlist);
    }
  };

  const getAuthUrl = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth-url");
      setAuthUrl(response.data.url);
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error getting auth URL:", error);
    }
  };

  const handleOAuthCallback = async () => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    if (!accessToken) return;

    try {
      const playlistsResponse = await axios.get(
        `http://localhost:5000/playlists`,
        {
          params: { accessToken, email: userEmail },
        }
      );
      const playlistsData = playlistsResponse.data;

      const playlistIds = playlistsData.map((playlist) => playlist.id);

      const videosResponse = await axios.get(
        "http://localhost:5000/playlist-videos",
        {
          params: {
            playlistIds,
            accessToken,
            playlists,
          },
          paramsSerializer: (params) => {
            return new URLSearchParams(
              Object.entries(params).flatMap(([key, value]) =>
                Array.isArray(value)
                  ? value.map((v) => [key, v])
                  : [[key, value]]
              )
            ).toString();
          },
        }
      );

      setPlaylists(videosResponse.data.playlists);

      // })
      await axios.post("http://localhost:5000/save-playlists", {
        email: userEmail,
        playlists: videosResponse.data.playlists,
      });
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        playlists,
        selectedPlaylist,
        getAuthUrl,
        handleOAuthCallback,
        updatePlaylistsInDB,
        setPlaylists,
        selectPlaylist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
