import {
  Dispatch,
  SetStateAction,
  useState,
  TouchEvent,
  useRef,
  MutableRefObject,
} from 'react';
import './TimePicker.css';

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

const TimePicker = () => {
  const [hours, setHours] = useState(0);
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
        <div
          className="time-section"
          onTouchStart={handleTouchStart}
          onTouchMove={(e) => handleTouchMove(e, setHours, 99, deltaYRef)}
        >
          {renderOptions(hours, 99)}
        </div>
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
