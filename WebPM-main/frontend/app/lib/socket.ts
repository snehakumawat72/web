import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (token: string) => {
  if (socket) {
    socket.disconnect();
  }

  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api-v1', '') || 'http://localhost:5000';
  
  socket = io(baseUrl, {
    auth: { token },
    transports: ['websocket', 'polling']
  });

  return socket;
};

export const getSocket = () => socket;

export default socket;