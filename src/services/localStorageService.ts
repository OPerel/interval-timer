import dayjs, { Dayjs } from 'dayjs';
import { Timer } from '../types.ts';

interface LocalStorageData {
  timers: Timer[];
}

class LocalStorage {
  static getItem<K extends keyof LocalStorageData>(
    key: K,
  ): LocalStorageData[K] | null {
    const data = localStorage.getItem(key);
    const parsedData = data ? JSON.parse(data) : null;
    return parsedData?.map((timer: Timer) => ({
      ...timer,
      mainTimer: dayjs(timer.mainTimer),
      interval: timer.interval ? dayjs(timer.interval) : undefined,
    }));
  }

  static setItem<K extends keyof LocalStorageData>(
    key: K,
    value: LocalStorageData[K],
  ): void {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  static removeTimer(timerId: string): Timer[] {
    const timers = this.getItem('timers');
    if (!timers) {
      return [];
    }
    const updatedTimers = timers.filter((timer) => timer.id !== timerId);
    this.setItem('timers', updatedTimers);
    return updatedTimers;
  }

  static addTimer(timer: {
    id: string;
    mainTimer: Dayjs;
    interval?: Dayjs;
  }): Timer[] {
    let timers = this.getItem('timers');

    if (!timers) {
      timers = [];
    }

    const existingTimer = timers.findIndex((t) => t.id === timer.id);

    if (existingTimer > -1) {
      timers[existingTimer] = timer;
    } else {
      timers.push(timer);
    }

    this.setItem('timers', timers);
    return timers;
  }
}

export default LocalStorage;
