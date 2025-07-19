import { Bell } from 'lucide-react';
import { useNotifications } from '@/hooks/use-notifications';
import { Link } from 'react-router';
import { Button } from '../ui/button';

export const NotificationBell = () => {
  const { unreadCount } = useNotifications();

  return (
    <Link to="/notifications">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>
    </Link>
  );
};