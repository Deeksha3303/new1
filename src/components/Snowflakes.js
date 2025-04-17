// Snowflakes.js
import React from 'react';
import '../index.css';

function Snowflakes() {
  const snowflakes = Array.from({ length: 100 }).map((_, i) => {
    const size = Math.random() * 10 + 10;  // Random snowflake size (between 10px and 20px)
    const xMovement = Math.random() * 2 - 1; // Random horizontal movement (-1 to 1)
    const delay = Math.random() * 2; // Random delay for staggered falling
    const speed = Math.random() * 5 + 5; // Random speed for snowflakes

    return (
      <div
        key={i}
        className="snowflake"
        style={{
          '--i': i, 
          '--x': xMovement, 
          '--size': size, 
          '--delay': delay, 
          width: `${size}px`, // Random width
          height: `${size}px`, // Random height
          animationDuration: `${speed}s`, // Adjust fall speed
        }}
      ></div>
    );
  });

  return <div className="snowflakes-container">{snowflakes}</div>;
}

export default Snowflakes;
