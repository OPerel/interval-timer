import { Dayjs } from 'dayjs';

export interface Timer {
  id: string;
  mainTimer: Dayjs;
  interval?: Dayjs;
}
