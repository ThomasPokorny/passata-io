export declare interface Task {
  id: number;
  state: 'open' | 'done';
  description: string;
  pomodoros: number;
}

export interface TaskCreate {
  description: string;
  pomodoros: number;
}
