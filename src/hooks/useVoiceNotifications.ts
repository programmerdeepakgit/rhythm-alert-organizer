import { useEffect, useRef } from 'react';
import { Task } from '@/types/schedule';
import { AppSettings } from '@/types/settings';

export const useVoiceNotifications = (tasks: Task[], settings: AppSettings) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastNotifiedRef = useRef<string>('');

  useEffect(() => {
    if (!settings.voiceEnabled || tasks.length === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // Check every minute
    intervalRef.current = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      // Find task that matches current time
      const currentTask = tasks.find(task => 
        task.time === currentTime && !task.completed
      );

      if (currentTask && lastNotifiedRef.current !== `${currentTime}-${currentTask.id}`) {
        // Speak the notification
        const message = settings.notificationText.replace('{activity}', currentTask.activity);
        
        if ('speechSynthesis' in window) {
          // Cancel any ongoing speech
          speechSynthesis.cancel();
          
          const utterance = new SpeechSynthesisUtterance(message);
          utterance.rate = 0.8;
          utterance.pitch = 1;
          utterance.volume = 1;
          
          speechSynthesis.speak(utterance);
        }

        // Show browser notification if permission granted
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Babes Habit', {
            body: message,
            icon: '/favicon.ico',
            tag: currentTask.id
          });
        }

        lastNotifiedRef.current = `${currentTime}-${currentTask.id}`;
      }
    }, 60000); // Check every minute

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tasks, settings]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);
};