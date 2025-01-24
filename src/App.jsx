import React from "react";
import Board from "./components/Board";
import Display from "./components/Display";
import StartBtn from "./components/StartBtn";
import './scss/app.scss';

import { createBoard } from "./utils/gameBoard";


function App() {
  return (
    <div id="root">
      <Board board={createBoard()} />
      <aside>
        <Display text="Score" />
        <StartBtn />
      </aside>
    </div>
  );
}

export default App;
