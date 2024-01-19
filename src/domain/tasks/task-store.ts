import { create } from 'zustand';
import { Task, TaskCreate } from '@/domain/tasks/task';

export const useTaskStore = create((set) => ({
  tasks: <Task[]>[],
  id: 0,
  createTask: (task: TaskCreate) => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: state.id,
          description: task.description,
          state: 'open',
          pomodoros: task.pomodoros,
        },
      ],
      id: state.id + 1,
    }));
  },
  closeTaskById: (taskId: number) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, state: 'done' } : task
      ),
    }));
  },
  openTaskById: (taskId: number) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, state: 'open' } : task
      ),
    }));
  },
  clearAllTasks: () => {
    set(() => ({
      tasks: [],
      id: 0,
    }));
  },
  deleteTaskById: (taskId: number) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));
