import { Roboto } from 'next/font/google';
import { PlusIcon } from '@heroicons/react/16/solid';
import PomodoroButton from '@/components/pomodoro-button';
import { useTaskStore } from '@/domain/tasks/task-store';
import { useState } from 'react';
const roboto = Roboto({ weight: '500', subsets: ['latin'] });

const TaskCreate = () => {
  const { createTask } = useTaskStore();
  const [description, setDescription] = useState<string>('');

  const handleChange = (event) => {
    const newValue = event.target.value;

    if (newValue !== description) {
      setDescription(newValue);
    }
  };

  const handleSubmit = () => {
    createTask({
      description: description,
      pomodoros: 0,
    });
    setDescription('');
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

/*
<input
          type="number"
          className="pl-2 placeholder:italic bg-gray-200 h-8 !outline-none border-transparent focus:border-transparent focus:ring-0 text-gray-500 text-sm rounded block w-[2.5rem]"
          placeholder="0"
        />
 */
