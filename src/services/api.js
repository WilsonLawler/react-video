import axios from "axios";
const cors = 'https://cors-anywhere.herokuapp.com/';

let token;
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  token = user.token;
}

const api = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://www.googleapis.com/youtube/v3',
});
// https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=3&key=

export default api;
