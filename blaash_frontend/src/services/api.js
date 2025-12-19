import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});


export const fetchUserDetails = async ({userEmail, setPlaylists}) => {
    try {
      const userResponse = await axios.get(`http://localhost:5000/api/auth/user/${userEmail}`);

      if (userResponse.data && userResponse.data.playlists) {
        setPlaylists(userResponse.data.playlists);
      } else {
        setPlaylists(null); 
      }
    } catch (error) {
      alert(error.response.data.message || 'Data not fetched');
    }
  };

export default API;
