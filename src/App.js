import React from 'react';
import Game from './components/Wordle';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="app">
        <h1 className="title">🎉 BIRTHDAY WORDLE 🎉</h1>
        <Game />
      </div>

      {/* Snowflakes floating effect */}
      <div className="snowflakes" aria-hidden="true">
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
      </div>
    </div>
  );
}

export default App;
