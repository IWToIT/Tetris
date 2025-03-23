import React from "react";

const NextTetramino = ({ shape, color }) => {
  return (
    <div className="next-tetramino">
      <h3>Next Tetramino</h3>
      <div className="next-tetramino-grid">
        {shape.map((row, rowIndex) => (
          <div key={rowIndex} className="next-tetramino-row">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`next-tetramino-cell ${cell ? "filled" : ""}`}
                style={{
                  backgroundColor: cell ? `rgb(${color})` : "transparent",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NextTetramino;
