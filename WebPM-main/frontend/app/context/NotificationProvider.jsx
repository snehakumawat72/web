import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("No token found, socket not connecting.");
      return;
    }

    const socketInstance = io(import.meta.env.VITE_API_URL?.replace('/api-v1', '') || 'http://localhost:5000', { 
      auth: { token },
      transports: ['websocket', 'polling']
    });

    socketInstance.on('connect', () => {
      console.log('Socket.IO connected successfully.');
      setSocket(socketInstance);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err.message);
    });
    
    socketInstance.on('new_notification', (data) => {
      console.log('New notification received:', data);
      setUnreadCount(data.unreadCount || 0);
      if (data.notification?.message) {
        toast.info(data.notification.message);
      }
    });

    socketInstance.on('unread_count_updated', (data) => {
      console.log('Unread count updated:', data);
      setUnreadCount(data.unreadCount || 0);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ unreadCount, setUnreadCount, socket }}>
      {children}
    </NotificationContext.Provider>
  );
};