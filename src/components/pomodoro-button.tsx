import { usePomodoroStore } from '@/domain/pomodoro/pomodoro-store';

export default function PomodoroButton(props: {
  label: string;
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
      {props.label}
    </button>
  );
}
