import './App.css';
import SetTimer from './screens/SetTimer/SetTimer.tsx';
import TimersList from './components/TimersList/TimersList.tsx';
import { useState } from 'react';
import { Timer } from './types.ts';
import { usePresetItems } from './providers/presetItemsContext.tsx';

function App() {
  const { timers } = usePresetItems();
  const [presetTimer, setPresetTimer] = useState<Timer>();

  return (
    <>
      <header>
        <h1>Shhhhh</h1>
      </header>
      <main>
        <SetTimer presetTimer={presetTimer} />
        {timers && timers.length > 0 && (
          <TimersList
            timers={timers}
            selectedTimer={presetTimer}
            setSelectedTimer={setPresetTimer}
          />
        )}
      </main>
    </>
  );
}

export default App;
