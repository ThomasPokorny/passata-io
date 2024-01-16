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
import { PauseIcon, PlayIcon } from '@heroicons/react/16/solid';
import { clearInterval, setInterval } from 'worker-timers';

const lobster = Lobster({ weight: '400', subsets: ['latin'] });
const roboto = Roboto({ weight: '500', subsets: ['latin'] });

export default function Home() {
  const { mode, setMode, transition } = usePomodoroStore();
  const [time, setTime] = useState(mode.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState<number>(null);

  const startTimer = () => {
    setIsRunning(true);
  };

  const clearIntervalTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }
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
    clearInterval(timerInterval);
    setTimerInterval(null);
    setIsRunning(false);
  };

  const getButtonTitle = () => (isRunning ? 'STOP' : 'START');

  const getButtonIcon = () =>
    isRunning ? <PauseIcon className="w-5 h-5 mr-2" /> : <></>;

  return (
    <div
      className={`h-screen bg-white ${
        mode === POMODORO ? 'background-pomodoro' : ''
      } ${mode === SHORT_BREAK ? 'background-short-break' : ''} ${
        mode === LONG_BREAK ? 'background-long-break' : ''
      } `}
    >
      <div className={'h-20 flex p-6 w-screen'}>
        <div
          className={`${lobster.className} text-4xl 
          ${mode.type == 'pomodoro' ? 'text-pomodoro-primary' : ''}
          ${mode.type == 'short-break' ? 'text-short_break-primary' : ''}
          ${mode.type == 'long-break' ? 'text-long_break-primary' : ''} `}
        >
          Passata 🥫
        </div>
        <div className={'ml-auto'}>
          <PomodoroButton>Reset</PomodoroButton>
        </div>
      </div>

      <div className={'flex justify-center'}>
        <div className={'mt-20 flex flex-col'}>
          <div
            className={`flex justify-center rounded-md 
             ${mode.type == 'pomodoro' ? 'bg-pomodoro-secondary' : ''}
             ${mode.type == 'short-break' ? 'bg-short_break-secondary' : ''}
          ${
            mode.type == 'long-break' ? 'bg-long_break-secondary' : ''
          } px-24 py-8`}
          >
            <div className={'flex flex-col'}>
              <div className={'text-[10rem] text-white'}>
                <p className={roboto.className}>{`${String(
                  Math.floor(time / 60)
                ).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`}</p>
              </div>
              <div className={'flex justify-center'}>
                <PomodoroButton
                  onClick={() => {
                    audioRef.current.play();
                    isRunning ? pauseTimer() : startTimer();
                  }}
                  className={`button-pomodoro-play ${roboto.className} w-40 py-3 px-6 text-xl ${isRunning}`}
                >
                  <div className={'flex justify-center items-center'}>
                    {getButtonIcon()} {getButtonTitle()}
                  </div>
                </PomodoroButton>
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
      </div>
    </div>
  );
}
