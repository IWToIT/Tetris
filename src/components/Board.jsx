import React from "react";
import Cell from "./Cell";

function Board({ board }) {
  return (
    <div className="board">
      {board.map((row, y) =>
        row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell} />)
      )}
    </div>
  );
}

export default Board;
