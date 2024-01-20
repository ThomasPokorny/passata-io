'use client';
import { Lobster, Roboto } from 'next/font/google';
import { useEffect, useState } from 'react';
import {
  LONG_BREAK,
  POMODORO,
  SHORT_BREAK,
} from '@/domain/pomodoro/pomodoro-mode';
import { usePomodoroStore } from '@/domain/pomodoro/pomodoro-store';
import PomodoroButton from '@/components/pomodoro-button';
import {
  PauseIcon,
  ArrowUturnLeftIcon,
  ForwardIcon,
  PlayCircleIcon,
} from '@heroicons/react/16/solid';
import { clearInterval, setInterval } from 'worker-timers';
import { playButtonClick } from '@/platform/audio-service';
import TaskOverview from '@/components/tasks/task-overview';
import TaskCreate from '@/components/tasks/task-create';

const lobster = Lobster({ weight: '400', subsets: ['latin'] });
const roboto = Roboto({ weight: '500', subsets: ['latin'] });

export default function Home() {
  const { mode, setMode, transition, reset } = usePomodoroStore();
  const [time, setTime] = useState(mode.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState<number>(null);

  const startTimer = () => {
    setIsRunning(true);
  };

  useEffect(() => {
    if (isRunning) {
      const timerIntervalId = setInterval(() => {
        // Calculate minutes and seconds
        if (time > 0) {
          const currentTime = time - 1;
          const minutes = Math.floor(currentTime / 60);
          const seconds = currentTime % 60;

          // Display the time in the format MM:SS
          document.title = `${String(minutes).padStart(2, '0')}:${String(
            seconds
          ).padStart(2, '0')} ${mode.title}`;

          // Update the state to trigger a re-render
          setTime((prevTime) => prevTime - 1);
          // Check if the timer has reached 0
        }
        if (time <= 0) {
          transition();
          setIsRunning(false); // Reset the isRunning state
        }
      }, 1000);

      setTimerInterval(timerIntervalId);
    }

    if (timerInterval != null) {
      clearInterval(timerInterval);
    }
  }, [time, isRunning]);

  useEffect(() => {
    if (isRunning) {
      pauseTimer();
    }
    setTime(mode.duration);
  }, [mode]);

  const pauseTimer = () => {
    if (timerInterval != null) {
      clearInterval(timerInterval);
    }
    setTimerInterval(null);
    setIsRunning(false);
  };

  const getButtonTitle = () => (isRunning ? 'STOP' : 'START');

  const getButtonIcon = () =>
    isRunning ? (
      <PauseIcon className="w-5 h-5 mr-2" />
    ) : (
      <PlayCircleIcon className="w-5 h-5 mr-2" />
    );

  const resetTimer = () => {
    playButtonClick();
    pauseTimer();
    reset();
    setTime(mode.duration);
  };

  return (
    <div
      className={`h-screen bg-gray-50 ${
        mode === POMODORO ? 'background-pomodoro' : ''
      } ${mode === SHORT_BREAK ? 'background-short-break' : ''} ${
        mode === LONG_BREAK ? 'background-long-break' : ''
      } `}
    >
      <div className={'h-20 flex items-center px-14 w-screen'}>
        <div className={`${lobster.className} text-4xl text-gray-600 neon`}>
          Passata 🥫
        </div>
        <div className={'ml-auto'}>
          <PomodoroButton
            className={'button-pomodoro-play'}
            onClick={resetTimer}
          >
            <div className={'flex justify-center items-center'}>
              <ArrowUturnLeftIcon className="w-5 h-5 mr-2" />
              Reset
            </div>
          </PomodoroButton>
        </div>
      </div>

      <div className={'flex flex-col items-center'}>
        <div className={'mt-4 flex flex-col'}>
          <div
            className={`flex justify-center rounded-lg bg-gray-200 px-24 py-8`}
          >
            <div className={'flex flex-col'}>
              <div className={'text-[10rem] text-gray-400'}>
                <p className={roboto.className}>{`${String(
                  Math.floor(time / 60)
                ).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`}</p>
              </div>
              <div className={'flex justify-center'}>
                <PomodoroButton
                  onClick={() => {
                    playButtonClick();
                    isRunning ? pauseTimer() : startTimer();
                  }}
                  className={`button-pomodoro-play ${roboto.className} w-40 py-3 px-6 text-xl ${isRunning}`}
                >
                  <div className={'flex justify-center items-center'}>
                    {getButtonIcon()} {getButtonTitle()}
                  </div>
                </PomodoroButton>
                {isRunning ? (
                  <div className="absolute ml-[25rem] mt-[0.5rem] cursor-pointer">
                    <ForwardIcon
                      onClick={() => transition(true)}
                      className="w-8 h-8 text-gray-400"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className={'mt-3'}>
            <div className={'flex justify-center space-x-4 w-full'}>
              <PomodoroButton onClick={() => setMode(POMODORO)}>
                Pomodoro
              </PomodoroButton>
              <PomodoroButton onClick={() => setMode(SHORT_BREAK)}>
                Short Break{' '}
              </PomodoroButton>
              <PomodoroButton onClick={() => setMode(LONG_BREAK)}>
                Long Break
              </PomodoroButton>
            </div>
          </div>
        </div>
        <div className="mt-8 min-h-[16rem]">
          <TaskOverview></TaskOverview>
        </div>
        <div className="mt-4">
          <TaskCreate />
        </div>
      </div>
    </div>
  );
}
