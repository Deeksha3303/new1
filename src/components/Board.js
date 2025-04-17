import React from "react";
import Tile from "./Tile";

function Board({ board, currentGuess, target, currentRow }) {

  const getStatus = (letter, idx, guess, target) => {
    if (target[idx] === letter) return "correct"; // Correct letter in correct position
    if (target.includes(letter)) return "present"; // Correct letter in wrong position
    return "absent"; // Letter is incorrect
  };

  return (
    <div className="board">
      {board.map((word, rowIdx) => {
        const row = rowIdx === currentRow ? currentGuess.padEnd(5) : board[rowIdx].padEnd(5);

        return (
          <div key={rowIdx} className="row">
            {row.split("").map((letter, i) => {
              const status = rowIdx < currentRow ? getStatus(letter, i, word, target) : undefined;

              return (
                <Tile
                  key={i}
                  letter={letter}
                  status={status}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
