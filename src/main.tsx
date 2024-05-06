import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import PresetItemsProvider from './providers/presetItemsContext.tsx';
import ThemeProvider from './providers/themeProvider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <PresetItemsProvider>
        <App />
      </PresetItemsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
