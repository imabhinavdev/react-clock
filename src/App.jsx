import React, { useContext, useEffect, useState } from 'react';
import Clock from './Components/Clock/Clock';
import ThemeState from './Context/ThemeState';
import ThemeContext from './Context/ThemeContext';
import './App.css';

const App = () => {
  const values = useContext(ThemeContext);
  const { theme, updateTheme } = values
  const [, forceUpdate] = useState();

  return (
      <div className={`${theme}`}>

        <Clock />
      </div>
  );
}

export default App;
