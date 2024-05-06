import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Timer } from '../types.ts';
import LocalStorageService from '../services/localStorageService.ts';

interface ProviderContext {
  timers: Timer[];
  addTimer: (timer: Timer) => void;
  removeTimer: (id: string) => void;
}

const initialState: ProviderContext = {
  timers: [],
  addTimer: () => {},
  removeTimer: () => {},
};

const PresetItemsContext = createContext<ProviderContext>(initialState);

export const usePresetItems = () => useContext(PresetItemsContext);

const PresetItemsProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<Timer[]>(() => {
    return LocalStorageService.getItem('timers') || [];
  });

  const addTimer = (timer: Timer) => {
    setState(() => {
      return LocalStorageService.addTimer(timer);
    });
  };

  const removeTimer = (id: string) => {
    setState(() => {
      return LocalStorageService.removeTimer(id);
    });
  };

  return (
    <PresetItemsContext.Provider
      value={{ timers: state, addTimer, removeTimer }}
    >
      {children}
    </PresetItemsContext.Provider>
  );
};

export default PresetItemsProvider;
