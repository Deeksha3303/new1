//Wordle.js
import React, { useState, useEffect } from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";
import Modal from "./Modal";
import { VALID_WORDS } from "./validwords";

// Target word and other constants
const TARGET = "ANIME"; // Change this to your chosen word
const BAN = ["ADIEU", "SPORT", "ROAST"];
const WORD_LENGTH = 5;
const MAX_TRIES = 6;

function Game() {
  const [board, setBoard] = useState(Array(MAX_TRIES).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [status, setStatus] = useState(null); // win / lose / null
  const [invalidWordMessage, setInvalidWordMessage] = useState(""); // State to manage invalid word message
  const [keyStates, setKeyStates] = useState({}); // Track the state of each key

  // Function to update key states
  const updateKeyStates = (guess, target) => {
    let newKeyStates = { ...keyStates };

    for (let i = 0; i < WORD_LENGTH; i++) {
      const letter = guess[i];
      const targetChar = target[i];

      if (letter === targetChar) {
        newKeyStates[letter] = "correct";
      } else if (target.includes(letter)) {
        newKeyStates[letter] = "present";
      } else {
        newKeyStates[letter] = "absent";
      }
    }

    setKeyStates(newKeyStates);
  };

  // Handle key presses for the game
  const handleKeyPress = (key) => {
    if (status) return;

    if (key === "ENTER") {
      if (currentGuess.length === WORD_LENGTH) {
        if (!VALID_WORDS.includes(currentGuess)) {
          setInvalidWordMessage("Don't guess random words -.-!");
          setTimeout(() => {
            setInvalidWordMessage(""); // Clear the message after 2 seconds
          }, 1700);
          return;
        }
        if (BAN.includes(currentGuess)) {
          setInvalidWordMessage("Not this word -_- Pick a different word!");
          setTimeout(() => {
            setInvalidWordMessage(""); // Clear the message after 2 seconds
          }, 1700);
          return;
        }

        const updatedBoard = [...board];
        updatedBoard[currentRow] = currentGuess;
        setBoard(updatedBoard);

        updateKeyStates(currentGuess, TARGET); // Update the keyboard key states

        if (currentGuess === TARGET) {
          setStatus("win");
        } else if (currentRow === MAX_TRIES - 1) {
          setStatus("lose");
        }

        setCurrentRow(currentRow + 1);
        setCurrentGuess("");
      }
    } else if (key === "DEL") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  useEffect(() => {
    const listener = (e) => {
      const key = e.key.toUpperCase();
      if (key === "BACKSPACE") handleKeyPress("DEL");
      else if (key === "ENTER") handleKeyPress("ENTER");
      else if (/^[A-Z]$/.test(key)) handleKeyPress(key);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  });

  return (
    <div className="game">
      <Board
        board={board}
        currentGuess={currentGuess}
        target={TARGET}
        currentRow={currentRow}
      />
      <Keyboard onKeyPress={handleKeyPress} keyStates={keyStates} /> {/* Pass keyStates to Keyboard */}

      {/* Show invalid word message */}
      {invalidWordMessage && (
        <div className="invalid-word-message">
          {invalidWordMessage}
        </div>
      )}

      {status && <Modal status={status} target={TARGET} />}
    </div>
  );
}

export default Game;
