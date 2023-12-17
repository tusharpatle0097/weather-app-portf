import React, { useState, useRef, useEffect, useContext } from 'react';
import './App.css';
import WeatherApp from './components/WeatherApp';
import DarkModeStore from './context/DarkModeStore';
const App = () => {

  return (
    <>
      <DarkModeStore>
        <WeatherApp />
      </DarkModeStore>
    </>
  );
}

export default App;
