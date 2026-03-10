import { useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import styles from './styles.module.scss';
import { redirect } from 'next/navigation';
import { useEditorModeStore } from '../../hooks/useEditorModeStore';

const COUNTER_COLORS = {
  normal: 'rgba(58, 147, 100, 0.75)',
  power: 'rgba(0, 221, 255, 0.75)',
  ultra: 'rgba(255, 136, 0, 0.75)',
} as const;

interface CounterRenderer {
  minutes: number;
  seconds: number;
  completed: boolean;
}

const COUNTDOWN_MS = 1200000; // 20 min

export const Counter = () => {
  const [endDate] = useState(() => Date.now() + COUNTDOWN_MS);
  const { powerMode, ultraMode } = useEditorModeStore();

  const backgroundColor = ultraMode
    ? COUNTER_COLORS.ultra
    : powerMode
      ? COUNTER_COLORS.power
      : COUNTER_COLORS.normal;

  const renderer = ({ minutes, seconds, completed }: CounterRenderer) => {
    if (completed) {
      return redirect('/thanks');
    }
    const isLastTime = minutes < 1;

    return (
      <span
        className={`${styles.counter} ${isLastTime ? styles.pulsation : ''}`}
        style={{ backgroundColor }}
      >
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  return <Countdown date={endDate} renderer={renderer} />;
};
