import { Dispatch, SetStateAction } from 'react';
import { Timer } from '../../types.ts';
import './TimersList.css';
import PresetTimer from '../PresetTimer/PresetTimer.tsx';
import { Button } from 'antd';

interface Props {
  timers: Timer[];
  selectedTimer?: Timer;
  setSelectedTimer: Dispatch<SetStateAction<Timer | undefined>>;
}
const TimersList = ({ timers, selectedTimer, setSelectedTimer }: Props) => {
  return (
    <div className="list-container">
      <div className="scrollable">
        <div className="timers-list">
          {timers.map((timer) => (
            <PresetTimer
              key={timer.id}
              timer={timer}
              isSelected={selectedTimer?.id === timer.id}
              setSelectedTimer={setSelectedTimer}
            />
          ))}
        </div>
      </div>
      <Button size="large" onClick={() => setSelectedTimer(undefined)}>
        Clear Selection
      </Button>
    </div>
  );
};

export default TimersList;
