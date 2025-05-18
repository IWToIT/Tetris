import React, { useEffect, useState, useCallback, useReducer } from "react";
import Board from "./components/Board";
import Display from "./components/Display";
import StartBtn from "./components/StartBtn";
import NextTetramino from "./components/NextTetramino";
import { checkCollizion } from "./utils/utils";
import "./scss/app.scss";

import { createBoard } from "./utils/gameBoard";
import { createTetramino } from "./utils/tetraminosRand";
import { tetrtaminoReducer, initialState } from "./utils/tetrisReducer";
import { useWhyDidYouUpdate } from "./utils/useWhyDidYouUpdate";

function App() {
  const [tetraminoState, tetraminoDispatch] = useReducer(
    tetrtaminoReducer,
    initialState
  );
  const { board, tetramino, nextTetramino, isPlaying } = tetraminoState;
  const [speed, setSpeed] = useState(800);
  const [score, setScore] = useState(0);

  const moveLeft = useCallback(() => {
    if (!isPlaying) return;

    if (!checkCollizion(board, tetramino, -1, 0)) {
      tetraminoDispatch({ type: "move-left" });
    }
  }, [isPlaying, board, tetramino]);

  const moveRight = useCallback(() => {
    if (!isPlaying) return;

    if (!checkCollizion(board, tetramino, 1, 0)) {
      tetraminoDispatch({ type: "move-right" });
    }
  }, [isPlaying, board, tetramino]);

  const rotate = useCallback(() => {
    if (!isPlaying) return;

    const rotatedShape = tetramino.shape[0].map((_, index) =>
      tetramino.shape.map((row) => row[index]).reverse()
    );

    if (!checkCollizion(board, { ...tetramino, shape: rotatedShape })) {
      tetraminoDispatch({ type: "rotate", payload: rotatedShape });
    }
  }, [isPlaying, board, tetramino]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isPlaying) return;

      switch (event.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowDown":
          setSpeed(100);
          // нужно будет отслеживать нажата ли кнопка вниз в тот момент, когда мы добавляем упавшую фигуру на доску
          setScore((prev) => prev + 1);
          break;
        case "ArrowUp":
          rotate();
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowDown") {
        setSpeed(800);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlaying, moveLeft, moveRight, rotate]);

  useEffect(() => {
    let interval;
    console.log(1);
    if (isPlaying) {
      interval = setInterval(() => {
        tetraminoDispatch({ type: "move-down" });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const handleStart = () => {
    tetraminoDispatch({ type: "reset-game" });
  };

  const displayBoard = board.map((row) => [...row]);

  if (tetramino && tetramino.shape) {
    tetramino.shape.forEach((row, yOffset) => {
      row.forEach((value, xOffset) => {
        if (value) {
          const boardY = tetramino.y + yOffset;
          const boardX = tetramino.x + xOffset;
          if (
            boardY >= 0 &&
            boardY < board.length &&
            boardX >= 0 &&
            boardX < board[0].length
          ) {
            displayBoard[boardY][boardX] = {
              type: tetramino.type,
              color: tetramino.color,
            };
          }
        }
      });
    });
  }

  return (
    <div id="root">
      <Board board={displayBoard} />
      <aside>
        <Display text={`Score: ${score}`} />
        <NextTetramino
          shape={nextTetramino.shape}
          color={nextTetramino.color}
        />
        <StartBtn callback={handleStart} />
      </aside>
    </div>
  );
}

export default App;
