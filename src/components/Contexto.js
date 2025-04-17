import React, { useState } from 'react';

// Target word
const TARGET = "CAKE";
// Related words in decreasing similarity (you control this order!)
const SIMILAR_WORDS = [
  "dessert", "frosting", "birthday", "sweet", "candles", "chocolate", "icing", "bake", "slice", "sugar"
];

function Contexto({ onBack }) {
  const [guess, setGuess] = useState('');
  const [results, setResults] = useState([]);
  const [won, setWon] = useState(false);

  const checkWord = () => {
    const word = guess.toLowerCase();
    if (word === TARGET) {
      setWon(true);
      setResults([{ word, rank: 0 }]);
    } else {
      const rank = SIMILAR_WORDS.indexOf(word);
      if (rank !== -1) {
        setResults([...results, { word, rank: rank + 1 }]);
      } else {
        setResults([...results, { word, rank: "🚫 Not related" }]);
      }
    }
    setGuess('');
  };

  return (
    <div>
      <h2>🧠 Contexto</h2>
      {won ? <h3>🎉 You found the word: {TARGET.toUpperCase()}!</h3> : (
        <>
          <input value={guess} onChange={e => setGuess(e.target.value)} />
          <button onClick={checkWord}>Guess</button>
        </>
      )}
      <div style={{ marginTop: '1rem' }}>
        {results.map((r, i) => (
          <div key={i}>{r.word} ➜ Rank: {r.rank}</div>
        ))}
      </div>
      <br />
      <button onClick={onBack}>⬅ Back</button>
    </div>
  );
}

export default Contexto;
