import { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { Timer } from '../../types.ts';
import RunTimer from '../Timer/RunTimer.tsx';
// import TimePicker from '../../components/TimePicker/TimePicker.tsx';
import { usePresetItems } from '../../providers/presetItemsContext.tsx';
import './SetTimer.css';
import TimePicker from '../../components/TimePicker/TimePicker.tsx';

interface Props {
  presetTimer?: Timer;
}

const SetTimer = ({ presetTimer }: Props) => {
  const [timer, setTimer] = useState<Partial<Timer> | undefined>(
    () => presetTimer,
  );
  const [time, setTime] = useState(() => presetTimer?.mainTimer);
  const [runTimer, setRunTimer] = useState(false);
  const { addTimer } = usePresetItems();

  useEffect(() => {
    setTimer(presetTimer);
    setTime(presetTimer?.mainTimer);
  }, [presetTimer]);

  const saveTimer = () => {
    if (!timer?.mainTimer) {
      return;
    }

    let id = timer?.id;
    if (!id) {
      id = crypto.randomUUID();
    }
    addTimer({
      id,
      mainTimer: timer.mainTimer,
      interval: timer.interval,
    });
  };

  return (
    <div className="set-timer-container">
      {/*<TimePicker*/}
      {/*  label={'Main Timer'}*/}
      {/*  onChange={(e) => {*/}
      {/*    setTimer((current) => ({ ...current, mainTimer: e }));*/}
      {/*  }}*/}
      {/*  value={timer?.mainTimer}*/}
      {/*/>*/}
      {/*<TimePicker*/}
      {/*  label={'Interval'}*/}
      {/*  onChange={(e) => setTimer((current) => ({ ...current, interval: e }))}*/}
      {/*  value={timer?.interval}*/}
      {/*/>*/}

      <TimePicker />

      <Space>
        <Button onClick={saveTimer} disabled={!timer?.mainTimer}>
          Save
        </Button>
        <Button
          onClick={() => {
            setRunTimer(true);
            setTime(timer?.mainTimer);
          }}
          disabled={!timer?.mainTimer}
        >
          Start
        </Button>
      </Space>

      {timer?.mainTimer && time && runTimer && (
        <RunTimer
          mainTimer={timer.mainTimer}
          setRunTimer={setRunTimer}
          time={time}
          setTime={setTime}
          interval={timer.interval}
        />
      )}
    </div>
  );
};

export default SetTimer;
