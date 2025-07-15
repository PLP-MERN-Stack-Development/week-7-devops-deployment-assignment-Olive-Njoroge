import axios from 'axios';
import io from 'socket.io-client'

const backendBaseUrl = import.meta.env.VITE_API_BASE_URL;
const API_BaseUrl = `${backendBaseUrl}/api`;

const API = axios.create({
    baseURL : API_BaseUrl
});

export const registerUser = (username) => {
   return API.post("/auth/register", {username});
}

export const getRooms = () => {
   return API.get("/rooms");
}

export const createRoom = (name) => {
   return API.post("/rooms", {name});
}

export const getMessages = (roomId) => {
   return API.get(`/messages/${roomId}`);
}

export const socket = io(backendBaseUrl, {autoConnect: false});

