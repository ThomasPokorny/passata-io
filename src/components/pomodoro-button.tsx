import { usePomodoroStore } from '@/domain/pomodoro/pomodoro-store';
import { JSXElement } from '@babel/types';

export default function PomodoroButton(props: {
  children: void;
  onClick?: () => void;
  className?: string;
}) {
  const { mode } = usePomodoroStore();
  // transition duration-500 ease-in-out
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} button-${mode.type} py-3 px-6 rounded-lg text-white`}
    >
      {props.children}
    </button>
  );
}
