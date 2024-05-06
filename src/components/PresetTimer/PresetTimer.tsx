import { Dispatch, SetStateAction } from 'react';
import { Badge } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Timer } from '../../types.ts';
import { usePresetItems } from '../../providers/presetItemsContext.tsx';
import './PresetTimer.css';

interface Props {
  timer: Timer;
  isSelected: boolean;
  setSelectedTimer: Dispatch<SetStateAction<Timer | undefined>>;
}
const PresetTimer = ({ timer, isSelected, setSelectedTimer }: Props) => {
  const { removeTimer } = usePresetItems();

  return (
    <Badge
      count={
        isSelected ? (
          <CloseOutlined
            className="close-icon"
            onClick={() => {
              removeTimer(timer.id);
            }}
          />
        ) : null
      }
      status="warning"
      offset={[-15, 15]}
    >
      <div
        className={`preset-timer ${isSelected ? 'selected-timer' : ''}`}
        onClick={() => setSelectedTimer(timer)}
      >
        <p>{timer.mainTimer.format('HH:mm:ss')}</p>
      </div>
    </Badge>
  );
};

export default PresetTimer;
