import { Task } from '@/domain/tasks/task';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { usePomodoroStore } from '@/domain/pomodoro/pomodoro-store';
import {
  LONG_BREAK,
  POMODORO,
  SHORT_BREAK,
} from '@/domain/pomodoro/pomodoro-mode';
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: '500', subsets: ['latin'] });

const TasksComponent = (props: {
  task: Task;
  onStatusChange: (task: Task) => void;
  onDelete: (task: Task) => void;
}) => {
  const { mode } = usePomodoroStore();
  return (
    <div
      className={'flex py-2.5 items-center px-4 bg-gray-100 rounded w-full '}
    >
      {props?.task?.state === 'open' ? (
        <CheckCircleIcon
          onClick={() => props.onStatusChange(props.task)}
          className="w-8 h-8 mr-2 cursor-pointer text-gray-400 hover:text-gray-500 transition-colors duration-400 ease-in-out"
        />
      ) : (
        <CheckCircleIconSolid
          onClick={() => props.onStatusChange(props.task)}
          className={`w-8 h-8 mr-2 cursor-pointer transition-colors duration-500 ease-in-out 
          ${mode === POMODORO ? 'text-pomodoro-primary' : ''}
          ${mode === SHORT_BREAK ? 'text-short_break-primary' : ''}
          ${mode === LONG_BREAK ? 'text-long_break-primary' : ''}`}
        />
      )}
      <div className={`${roboto.className} text-gray-500`}>
        {props.task.description}
      </div>
      <div
        className={`${roboto.className} text-gray-500 text-sm ml-auto cursor-default`}
      >
        {props.task.pomodoros}/ <span className="text-xs">🍅</span>
      </div>
      <div className="ml-6">
        <TrashIcon
          onClick={() => props.onDelete(props.task)}
          className="w-5 text-gray-400 cursor-pointer"
        />
      </div>
    </div>
  );
};
export default TasksComponent;
