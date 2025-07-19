// frontend/src/components/layout/NotificationBell.jsx

import { Bell } from 'lucide-react';
import { useNotifications } from '@/context/NotificationProvider';
import { useNavigate } from 'react-router-dom';

export const NotificationBell = () => {
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/notifications')} className="relative">
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
       
          {unreadCount}
        
      )}
    </button>
  );
};