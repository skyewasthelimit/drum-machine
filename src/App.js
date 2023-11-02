import './App.css';
import React, { useState, useEffect } from 'react';

//  Sounds
import clap from "./sounds/Clap.mp3";
import heater1 from "./sounds/Heater-1.mp3";
import heater2 from "./sounds/Heater-2.mp3";
import heater3 from "./sounds/Heater-3.mp3";
import heater4 from "./sounds/Heater-4.mp3";
import kickandhh from "./sounds/kick-and-hh.mp3";
import kick from "./sounds/kick.mp3";
import openhh from "./sounds/Open-HH.mp3";
import closedhh from "./sounds/closed-hh.mp3";

const VolumeSlider = ({ onVolumeChange }) => {
  const [volume, setVolume] = useState(50);
  
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    onVolumeChange(newVolume);
  };

  return (
    <div>
      <label htmlFor="volumeSlider">♫ {volume}</label>
      <input
        type="range"
        id="volumeSlider"
        name="volumeSlider"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

function App() {
  const [activeButton, setActiveButton] = useState(null);
  const [volume, setVolume] = useState(50);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.volume = volume / 100;
    audio.play();
  };

  const handleButtonClick = (sound, buttonId) => {
    playSound(sound);
    setActiveButton(buttonId);
  };

  const handleKeyPress = (event) => {
    switch (event.key.toUpperCase()) {
      case 'Q':
        handleButtonClick(heater1, 'heater1');
        playSound(heater1);

        break;
        case 'W':
          playSound(heater2);
          handleButtonClick(heater2, 'heater2');
          break;
        case 'E':
          playSound(heater3);
          handleButtonClick(heater3, 'heater3');
          break;
        case 'A':
          playSound(heater4);
          handleButtonClick(heater4, 'heater4');
          break;
        case 'S':
          playSound(clap);
          handleButtonClick(clap, 'clap');
          break;
        case 'D':
          playSound(openhh);
          handleButtonClick(openhh, 'open-hh');
          break;
        case 'Z':
          playSound(kickandhh);
          handleButtonClick(kickandhh, 'kick-and-hh');
          break;
        case 'X':
          playSound(kick);
          handleButtonClick(kick, 'kick');
          break;
        case 'C':
          playSound(closedhh);
          handleButtonClick(closedhh, 'closed-hh');
          break;

        default:
        break;
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);


  return (
    <div className="App">
      <div id="drum-machine">
        <header id="title">
        DRUM MACHINE
        </header>
        <div id="drum-pad">
          <button id="heater1" className={`drumpad ${activeButton === 'heater1' ? 'active' : ''}`} onClick={() => handleButtonClick(heater1, 'heater1')}>Q</button>
          <button id="heater2" className={`drumpad ${activeButton === 'heater2' ? 'active' : ''}`} onClick={() => handleButtonClick(heater2, 'heater2')}>W</button>
          <button id="heater3" className={`drumpad ${activeButton === 'heater3' ? 'active' : ''}`} onClick={() => handleButtonClick(heater3, 'heater3')}>E</button>
          <button id="heater4" className={`drumpad ${activeButton === 'heater4' ? 'active' : ''}`} onClick={() => handleButtonClick(heater4, 'heater4')}>A</button>
          <button id="clap" className={`drumpad ${activeButton === 'clap' ? 'active' : ''}`} onClick={() => handleButtonClick(clap, 'clap')}>S</button>
          <button id="open-hh" className={`drumpad ${activeButton === 'open-hh' ? 'active' : ''}`} onClick={() => handleButtonClick(openhh, 'open-hh')}>D</button>
          <button id="kick-and-hh" className={`drumpad ${activeButton === 'kick-and-hh' ? 'active' : ''}`} onClick={() => handleButtonClick(kickandhh, 'kick-and-hh')}>Z</button>
          <button id="kick" className={`drumpad ${activeButton === 'kick' ? 'active' : ''}`} onClick={() => handleButtonClick(kick, 'kick')}>X</button>
          <button id="closed-hh" className={`drumpad ${activeButton === 'closed-hh' ? 'active' : ''}`} onClick={() => handleButtonClick(closedhh, 'closed-hh')}>C</button>
        </div>
        <div id="controls">
          <VolumeSlider onVolumeChange={handleVolumeChange} />
        </div>
        <div id="display">
        <p>{activeButton}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
