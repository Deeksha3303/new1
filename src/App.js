// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import WordlePage from './components/WordlePage';
import Contexto from './components/Contexto'; 
import Crossword from './components/Crossword'; 


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wordle" element={<WordlePage />} />
      <Route path="/contexto" element={<Contexto />} />
      <Route path="/crossword" element={<Crossword />} />
    </Routes>
  );
}

export default App;
