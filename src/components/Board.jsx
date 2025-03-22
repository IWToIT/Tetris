import React from "react";

const Board = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`board-cell ${cell !== "0" ? "filled" : ""}`}
              style={{
                backgroundColor:
                  cell !== "0" && cell.color
                    ? `rgb(${cell.color})`
                    : "transparent",
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
