export interface AppSettings {
  notificationText: string;
  voiceEnabled: boolean;
}

export interface WeeklySchedule {
  weekStartDate: string; // ISO date string for the Monday of the week
  ondayDates: string[];  // Array of dates that should use onday template
  offdayDates: string[]; // Array of dates that should use offday template
}

export const DEFAULT_SETTINGS: AppSettings = {
  notificationText: "Babes It's Time of {activity}",
  voiceEnabled: true,
};