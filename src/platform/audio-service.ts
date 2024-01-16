export function playButtonClick() {
  playSound('/audio/click.mp3');
}

export function playAlarm() {
  playSound('/audio/alarm.mp3');
}
// '/audio/click.mp3'
function playSound(src: string) {
  const audio = new Audio(src);
  audio.play();
}
