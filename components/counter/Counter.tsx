import Countdown, {zeroPad} from 'react-countdown';
import styles from './styles.module.scss';
import {redirect} from "next/navigation";

interface CounterRenderer {
  minutes: number;
  seconds: number;
  completed: boolean;
}

export const Counter = () => {
  const renderer = ({ minutes, seconds, completed }: CounterRenderer) => {
    if (completed) {
      // Render a completed state
      return redirect('/thanks');
    } else {
      const isLastTime = minutes < 1;

      // Render a countdown
      return (
        <span className={`${styles.counter} ${isLastTime ? styles.pulsation : ''}`}>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  return <Countdown date={Date.now() + 900000} renderer={renderer} />;
};
