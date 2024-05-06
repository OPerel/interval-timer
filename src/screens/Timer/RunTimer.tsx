import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Dayjs } from 'dayjs';
import { Button, Progress, Space, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import useInterval from '../../hooks/useInterval.tsx';
import audioFile from '../../assets/sounds/zen-gong-199844.mp3';
import './RunTimer.css';

interface Props {
  mainTimer: Dayjs;
  setRunTimer: Dispatch<SetStateAction<boolean>>;
  time: Dayjs;
  setTime: Dispatch<SetStateAction<Dayjs | undefined>>;
  interval?: Dayjs;
}

const RunTimer = ({
  mainTimer,
  setRunTimer,
  time,
  setTime,
  interval,
}: Props) => {
  // const [pause, setPause] = useState(false);
  const audio = useRef(new Audio(audioFile));

  const originalTime =
    mainTimer.hour() * 3600 + mainTimer.minute() * 60 + mainTimer.second();
  const diff = mainTimer.diff(time, 'second');
  const percent = (diff / originalTime) * 100;
  const done = percent >= 100;

  let intervalTotalSeconds;
  if (interval) {
    intervalTotalSeconds =
      interval.hour() * 3600 + interval.minute() * 60 + interval.second();
  }

  useInterval(
    () => {
      setTime((current) => current?.subtract(1, 'second'));
    },
    done ? null : 1000,
  );

  useInterval(
    () => {
      audio.current.play();
    },
    done || !intervalTotalSeconds ? null : intervalTotalSeconds * 1000,
  );

  useEffect(() => {
    if (done) {
      audio.current.play();
    }
  }, [done, setRunTimer]);

  return (
    <div className="run-timer">
      <Progress
        type="circle"
        size={220}
        strokeWidth={4}
        percent={percent}
        format={() =>
          percent < 100 ? (
            <Typography.Title>{time.format('HH:mm:ss')}</Typography.Title>
          ) : (
            <CheckOutlined />
          )
        }
      />
      <Space>
        <Button onClick={() => setRunTimer(false)}>Stop</Button>
        {/*<Button onClick={() => setPause((current) => !current)}>Pause</Button>*/}
      </Space>
    </div>
  );
};

export default RunTimer;
