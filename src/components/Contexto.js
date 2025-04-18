import React, { useState } from 'react';
import './Contexto.css';
import { useNavigate } from 'react-router-dom';


const TARGET = "cake";
const WORD_RANKINGS = {
  "cake": 1, "dessert": 2, "frosting": 3, "birthday": 4, "sweet": 5,
  "candles": 6, "chocolate": 7, "icing": 8, "bake": 9, "slice": 10,
  "sugar": 11, "snack": 20, "bread": 50, "fruit": 100, "car": 999,
};

function Contexto({ onBack }) {
  const [guess, setGuess] = useState('');
  const [results, setResults] = useState([]);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const navigate = useNavigate();
  const alreadyGuessed = new Set(results.map(r => r.word));

  const getBarColor = (rank) => {
    if (rank <= 30) return '#4caf50';     // Green
    if (rank <= 100) return '#ffa726';    // Orange
    return '#ef5350';                     // Red
  };
  
  const getBarWidth = (rank) => {
    const maxRank = 999;
    return `${Math.max(5, ((1000 - rank) / 1000) * 100)}%`; // min 5%
  };
  

  const checkWord = () => {
    const word = guess.trim().toLowerCase();
    if (!word || alreadyGuessed.has(word)) return;

    const rank = WORD_RANKINGS[word] || 999;
    if (word === TARGET) {
      setShowWinPopup(true);
      setResults(prev => [...prev, { word, rank: 1 }]);
    } else {
      setResults(prev => [...prev, { word, rank }]);
    }
    setGuess('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') checkWord();
  };

  const giveHint = () => {
    const guessedRanks = results
      .map(r => r.rank)
      .filter(r => typeof r === 'number' && r !== 1); // exclude target word
  
    const bestRank = guessedRanks.length ? Math.min(...guessedRanks) : 999;
    const targetHintRank = Math.floor(bestRank / 2);
  
    const possibleHints = Object.entries(WORD_RANKINGS)
      .filter(([word, rank]) =>
        word !== TARGET &&
        !alreadyGuessed.has(word)
      )
      .map(([word, rank]) => ({ word, rank }));
  
    if (possibleHints.length === 0) {
      alert("No more hints available.");
      return;
    }
  
    // Find word closest to targetHintRank
    possibleHints.sort((a, b) =>
      Math.abs(a.rank - targetHintRank) - Math.abs(b.rank - targetHintRank)
    );
  
    const { word, rank } = possibleHints[0];
    setResults(prev => [...prev, { word, rank }]);
  };
  
  

  const closePopup = () => {
    setShowWinPopup(false);
  };

  return (
    <div className="contexto-container">
      <h2>CONTEXTO</h2>
      <input
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your guess"
        className="contexto-input"
      />
      <div className="button-row">
        <button onClick={checkWord}>Guess</button>
        <button onClick={giveHint}>Hint 💡</button>
      </div>

      <div className="guesses-container">
        {[...results].sort((a, b) => a.rank - b.rank).map((r, i) => (
          <div key={i} className="guess-box-wrapper">
            <div
              className="guess-box-filled"
              style={{
                backgroundColor: getBarColor(r.rank),
                width: getBarWidth(r.rank),
              }}
            >

              <div className="guess-box-content">
                <span className="guess-word">{r.word.toUpperCase()}</span>
                <span className="guess-rank">{r.rank}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <br />
      <button className="back-button" onClick={() => navigate('/')}>⬅ Back</button>
          
      {showWinPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>🎉 You found the word!</h2>
            <p>The word was <strong>{TARGET.toUpperCase()}</strong></p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contexto;
