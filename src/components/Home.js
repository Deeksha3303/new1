// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>🎂 Welcome to Birthday Game Central 🎉</h1>
      <button onClick={() => navigate('/wordle')}>Play Wordle</button>
      <button onClick={() => navigate('/contexto')}>Play Contexto</button>
      <button onClick={() => navigate('/crossword')}>Play Crossword</button>
    </div>
  );
}

export default Home;
