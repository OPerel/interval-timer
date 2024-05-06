import { Dispatch, SetStateAction, useState, TouchEvent } from 'react';
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

  const handleScroll = (
    event: TouchEvent<HTMLDivElement>,
    setValue: Dispatch<SetStateAction<number>>,
    max: number,
  ) => {
    // const delta = Math.sign(event.deltaY);
    const touch = event.touches[0];
    const deltaY = touch.clientY - (touch.target as any).offsetTop;
    const delta =
      deltaY > 0 ? Math.ceil(deltaY / 500) : Math.floor(deltaY / 500);
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
    <div className="time-picker">
      <div
        className="time-section"
        onTouchMove={(e) => handleScroll(e, setHours, 99)}
      >
        {renderOptions(hours, 99)}
      </div>
      <div>:</div>
      <div
        className="time-section"
        onTouchMove={(e) => handleScroll(e, setMinutes, 59)}
      >
        {renderOptions(minutes, 59)}
      </div>
      <div>:</div>
      <div
        className="time-section"
        onTouchMove={(e) => handleScroll(e, setSeconds, 59)}
      >
        {renderOptions(seconds, 59)}
      </div>
    </div>
  );
};

export default TimePicker;
