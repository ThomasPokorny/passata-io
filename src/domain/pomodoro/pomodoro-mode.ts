export type PomodoroType = 'pomodoro' | 'short-break' | 'long-break';
export interface PomodoroMode {
  type: PomodoroType;
  duration: number;
  title: string;
}

export const POMODORO: PomodoroMode = {
  type: 'pomodoro',
  duration: 25 * 60,
  title: 'Focus Time',
};

export const SHORT_BREAK: PomodoroMode = {
  type: 'short-break',
  duration: 5 * 60,
  title: 'Short Break',
};

export const LONG_BREAK: PomodoroMode = {
  type: 'long-break',
  duration: 15 * 60,
  title: 'Long Break',
};
