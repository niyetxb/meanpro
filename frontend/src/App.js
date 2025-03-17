import React, { useEffect, useState } from 'react';
import { Button, Switch } from 'antd';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  const [loggingEnabled, setLoggingEnabled] = useState(true);

  useEffect(() => {
    if (loggingEnabled) console.log('App component mounted');
    return () => {
      if (loggingEnabled) console.log('App component unmounted');
    };
  }, [loggingEnabled]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>LOG</h1>
      <div style={{ marginTop: '10px' }}>
        <span>Logging: </span>
        <Switch checked={loggingEnabled} onChange={setLoggingEnabled} />
      </div>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </div>


  );
};

export default App;
