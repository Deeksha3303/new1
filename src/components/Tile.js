import React from "react";
import "../App.css"; // Make sure to add styles for the statuses

function Tile({ letter, status }) {
  let tileClass = "tile";

  if (status === "correct") {
    tileClass += " correct";
  } else if (status === "present") {
    tileClass += " present";
  } else if (status === "absent") {
    tileClass += " absent";
  }

  return (
    <div className={tileClass}>
      {letter}
    </div>
  );
}

export default Tile;
