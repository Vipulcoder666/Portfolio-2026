// client/src/hooks/useLocalTime.js
import { useState, useEffect } from 'react';

export function useLocalTime(timeZone = 'Asia/Kolkata') {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    function update() {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr('');
      }
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return timeStr;
}
