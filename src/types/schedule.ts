export interface Task {
  id: string;
  time: string;
  activity: string;
  completed?: boolean;
}

export interface DaySchedule {
  date: string;
  type: 'onday' | 'offday' | 'custom';
  tasks: Task[];
}

export const ONDAY_TEMPLATE: Task[] = [
  { id: '1', time: '05:00', activity: 'meditation & wake' },
  { id: '2', time: '06:00', activity: 'ready for coaching' },
  { id: '3', time: '07:00', activity: 'travel time' },
  { id: '4', time: '07:56', activity: 'classes time' },
  { id: '5', time: '14:30', activity: 'travel time' },
  { id: '6', time: '15:30', activity: 'reached home' },
  { id: '7', time: '17:00', activity: 'practice time' },
  { id: '8', time: '20:00', activity: 'revision' },
  { id: '9', time: '21:00', activity: 'code world' },
  { id: '10', time: '22:30', activity: 'bedtime' },
];

export const OFFDAY_TEMPLATE: Task[] = [
  { id: '1', time: '05:00', activity: 'meditation & walking' },
  { id: '2', time: '06:00', activity: 'take bath & ready' },
  { id: '3', time: '07:00', activity: 'learning english' },
  { id: '4', time: '09:00', activity: 'learning I.P' },
  { id: '5', time: '11:00', activity: 'revision' },
  { id: '6', time: '13:00', activity: 'break time' },
  { id: '7', time: '15:00', activity: 'practice questions' },
  { id: '8', time: '18:00', activity: 'backlog time' },
  { id: '9', time: '19:00', activity: 'code world' },
  { id: '10', time: '21:30', activity: 'bed time' },
];