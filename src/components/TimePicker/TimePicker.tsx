import { Dispatch, SetStateAction, useState, WheelEvent } from 'react';
import './TimePicker.css';

const TimePicker = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleScroll = (
    event: WheelEvent<HTMLDivElement>,
    setValue: Dispatch<SetStateAction<number>>,
    max: number,
  ) => {
    const delta = Math.sign(event.deltaY);
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
        onWheel={(e) => handleScroll(e, setHours, 99)}
      >
        {hours.toString().padStart(2, '0')}
      </div>
      <div>:</div>
      <div
        className="time-section"
        onWheel={(e) => handleScroll(e, setMinutes, 59)}
      >
        {minutes.toString().padStart(2, '0')}
      </div>
      <div>:</div>
      <div
        className="time-section"
        onWheel={(e) => handleScroll(e, setSeconds, 59)}
      >
        {seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default TimePicker;
