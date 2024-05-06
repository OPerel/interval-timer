import { TimePicker as Picker } from 'antd';
import { TimePickerProps } from 'antd/es/time-picker';

interface Props extends TimePickerProps {
  label: string;
}
const TimePicker4 = ({ label, ...rest }: Props) => {
  return (
    <p>
      <label>{label}</label>
      <Picker variant="borderless" size="large" showNow={false} {...rest} />
    </p>
  );
};

export default TimePicker4;
