import { create } from 'zustand';
import {
  LONG_BREAK,
  POMODORO,
  PomodoroMode,
  SHORT_BREAK,
} from '@/domain/pomodoro/pomodoro-mode';
import { playAlarm } from '@/platform/audio-service';

export const usePomodoroStore = create((set) => ({
  mode: POMODORO,
  pomodoroCount: 0,
  setMode: (mode: PomodoroMode) =>
    set(() => ({ mode: mode, pomodoroCount: 0 })),
  reset: () => {
    set(() => ({ mode: POMODORO, pomodoroCount: 0 }));
  },
  transition: (forced?: boolean) => {
    if (!forced) {
      playAlarm();
    }
    set((state) => {
      if (state.mode === SHORT_BREAK || state.mode === LONG_BREAK) {
        return { mode: POMODORO };
      }
      if (state.mode === POMODORO && state.pomodoroCount + 1 < 4) {
        return { mode: SHORT_BREAK, pomodoroCount: state.pomodoroCount + 1 };
      }

      return { mode: LONG_BREAK, pomodoroCount: 0 };
    });
  },
}));
