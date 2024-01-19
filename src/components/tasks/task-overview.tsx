import { Roboto } from 'next/font/google';
import PomodoroButton from '@/components/pomodoro-button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useTaskStore } from '@/domain/tasks/task-store';
import TasksComponent from '@/components/tasks/tasks-component';
import { useState } from 'react';

const roboto = Roboto({ weight: '500', subsets: ['latin'] });

const TaskOverview = () => {
  const { tasks, clearAllTasks, closeTaskById, openTaskById, deleteTaskById } =
    useTaskStore();
  const [pasta, setPasta] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className={`${roboto.className} flex items-center text-gray-500 text-lg w-[35rem] border-b border-gray-300 p-3`}
      >
        <div>Tasks</div>
        <PomodoroButton
          onClick={() => clearAllTasks()}
          className="ml-auto h-8 text-sm flex items-center button-pomodoro-play"
        >
          <TrashIcon className="text-white w-4" />
        </PomodoroButton>
      </div>

      <div className={'mt-3 flex flex-col space-y-2 '}>
        {tasks.map((task) => {
          return (
            <div key={task.id}>
              <TasksComponent
                task={task}
                onStatusChange={(tasks) => {
                  task.state === 'open'
                    ? closeTaskById(task.id)
                    : openTaskById(task.id);
                }}
                onDelete={(tasks) => {
                  deleteTaskById(tasks.id);
                }}
              />
            </div>
          );
        })}

        {tasks.length == 0 ? (
          <div
            onMouseEnter={() => setPasta(true)}
            onMouseLeave={() => setPasta(false)}
            className={`${roboto.className} mt-10 ml-auto mr-auto text-gray-400 hover:text-gray-500 cursor-default`}
          >
            No open tasks, time to enjoy some pasta{' '}
            <span
              className={`${
                !pasta ? 'text-transparent' : ''
              } transition-all duration-400 ease-in-out`}
            >
              🍝
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default TaskOverview;
