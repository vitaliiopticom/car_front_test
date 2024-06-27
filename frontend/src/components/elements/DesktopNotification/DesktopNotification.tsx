import { useEffect, useCallback } from 'react';

interface DesktopNotificationProps {
  title: string;
  message: string;
  icon: string;
}

const DesktopNotification = ({
  title,
  message,
  icon,
}: DesktopNotificationProps) => {
  const showNotification = useCallback(() => {
    if (!('Notification' in window)) {
      console.log('Browser does not support desktop notification');
      return;
    }

    const options = { body: message, icon: icon };
    const displayNotification = () =>
      (new Notification(title, options).onclick = () => window.focus());

    if (Notification.permission === 'granted') {
      displayNotification();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          displayNotification();
        }
      });
    }
  }, [title, message, icon]);

  useEffect(() => {
    showNotification();
  }, [showNotification]);

  return null;
};

export default DesktopNotification;
