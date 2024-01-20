import { Roboto } from 'next/font/google';
import PomodoroButton from '@/components/pomodoro-button';
import { useTaskStore } from '@/domain/tasks/task-store';
import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
const roboto = Roboto({ weight: '500', subsets: ['latin'] });

const TaskCreate = () => {
  const { createTask } = useTaskStore();
  const [description, setDescription] = useState<string>('');
  const [pomodoros, setPomodoros] = useState<number>(0);

  const handleChange = (event) => {
    const newValue = event.target.value;

    if (newValue !== description) {
      setDescription(newValue);
    }
  };

  const handleSubmit = () => {
    createTask({
      description,
      pomodoros,
    });
    setDescription('');
    setPomodoros(0);
  };

  return (
    <div
      className={`${roboto.className} flex items-center text-gray-500 w-[35rem] rounded border-2 border-dashed border-gray-200 p-3`}
    >
      <div className="flex flex-row items-center w-full">
        <input
          type="text"
          placeholder="New Task"
          value={description}
          onChange={handleChange}
          className="pl-5 placeholder:italic bg-gray-200 h-8 !outline-none border-transparent focus:border-transparent focus:ring-0 text-gray-500 text-sm rounded block w-[20rem]"
        />
        <div
          className={`${roboto.className} text-gray-500 text-sm ml-auto cursor-default`}
        >
          {pomodoros}/{' '}
          <span className="text-xs">{pomodoros >= 10 ? '🥫' : '🍅'}</span>
        </div>
        <div className="flex flex-col ml-2">
          <ChevronUpIcon
            className="text-gray-400 w-3 cursor-pointer hover:text-gray-500"
            onClick={() => {
              setPomodoros(pomodoros + 1);
            }}
          />
          <ChevronDownIcon
            className="text-gray-400 w-3 cursor-pointer hover:text-gray-500"
            onClick={() => {
              if (pomodoros != 0) {
                setPomodoros(pomodoros - 1);
              }
            }}
          />
        </div>
        <PomodoroButton
          type="submit"
          className="ml-auto h-8 flex items-center text-sm"
          onClick={handleSubmit}
        >
          Add
        </PomodoroButton>
      </div>
    </div>
  );
};
export default TaskCreate;
