import React from "react";
import Cell from "./Cell";

function Board({ board }) {
  return (
    <div className="board">
      {board.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </div>
  );
}

export default Board;
