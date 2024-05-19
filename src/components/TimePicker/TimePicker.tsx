import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  TouchEvent,
  useRef,
  useState,
} from 'react';
import './TimePicker.css';
import VirtualScroller from '../VirtualScroller/VirtualScroller.tsx';

const renderOptions = (value: number, max: number) => {
  const prevValue = value === 0 ? max : value - 1;
  const nextValue = value === max ? 0 : value + 1;
  return (
    <>
      <div className="option">{prevValue.toString().padStart(2, '0')}</div>
      <div className="selected">{value.toString().padStart(2, '0')}</div>
      <div className="option">{nextValue.toString().padStart(2, '0')}</div>
    </>
  );
};

const SETTINGS = {
  itemHeight: 86,
  amount: 3,
  tolerance: 2,
  minIndex: 0,
  maxIndex: 99,
  startIndex: 1,
};

const getData = (offset: number, limit: number) => {
  const data = [];
  const range = SETTINGS.maxIndex - SETTINGS.minIndex + 1;
  console.log(`offset [${offset} -> range ${range}] -> limit ${limit}`);

  for (let i = 0; i < limit; i++) {
    const index = (offset + i) % range;
    const value = index < 0 ? index + range : index;
    data.push({ id: value, text: value.toString().padStart(2, '0') });
  }

  return data;
};

const rowTemplate = <T extends { id: number; text: string }>(props: T) => (
  <div className="item" key={props.id}>
    {props.text}
  </div>
);

const TimePicker = () => {
  // const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const deltaYRef = useRef(0);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    deltaYRef.current = event.touches[0].clientY;
  };

  const handleTouchMove = (
    event: TouchEvent<HTMLDivElement>,
    setValue: Dispatch<SetStateAction<number>>,
    max: number,
    deltaYRef: MutableRefObject<number>,
  ) => {
    const deltaY = event.touches[0].clientY - deltaYRef.current; // Calculate the difference in touch positions
    const sensitivity = 0.05; // Adjust sensitivity to control scrolling speed
    const delta = Math.round(deltaY * sensitivity);
    setValue((prev) => {
      let newValue = prev + delta;
      if (newValue < 0) {
        newValue = max;
      } else if (newValue > max) {
        newValue = 0;
      }
      return newValue;
    });
  };

  return (
    <>
      <div className="titles">
        <h4>Hours</h4>
        <h4>Minutes</h4>
        <h4>Seconds</h4>
      </div>
      <div className="time-picker">
        <VirtualScroller
          settings={SETTINGS}
          getMoreData={getData}
          row={(props) => rowTemplate(props)}
        />
        <div>:</div>
        <div
          className="time-section"
          onTouchStart={handleTouchStart}
          onTouchMove={(e) => handleTouchMove(e, setMinutes, 59, deltaYRef)}
        >
          {renderOptions(minutes, 59)}
        </div>
        <div>:</div>
        <div
          className="time-section"
          onTouchStart={handleTouchStart}
          onTouchMove={(e) => handleTouchMove(e, setSeconds, 59, deltaYRef)}
        >
          {renderOptions(seconds, 59)}
        </div>
      </div>
    </>
  );
};

export default TimePicker;
