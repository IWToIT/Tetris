import React, { useEffect, useCallback, useReducer } from "react";
import Board from "./components/Board";
import Display from "./components/Display";
import StartBtn from "./components/StartBtn";
import NextTetramino from "./components/NextTetramino";
import { checkCollizion } from "./utils/utils";
import "./scss/app.scss";
import { tetraminoReducer, initialState } from "./utils/tetrisReducer";

function App() {
  const [tetraminoState, tetraminoDispatch] = useReducer(
    tetraminoReducer,
    initialState
  );
  const {
    board,
    tetramino,
    nextTetramino,
    isPlaying,
    score,
    speed,
    turbo,
    totalLinesCleared,
  } = tetraminoState;

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
          //мягкое падение
          tetraminoDispatch({ type: "set-turbo", payload: true });
          // нужно будет отслеживать нажата ли кнопка вниз в тот момент, когда мы добавляем упавшую фигуру на доску
          break;
        case "ArrowUp":
          rotate();
          break;
        case " ":
          //жесткое падение
          tetraminoDispatch({ type: "set-drop" });
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowDown") {
        tetraminoDispatch({ type: "set-turbo", payload: false });
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
    if (isPlaying) {
      const currentSpeed = turbo ? speed * 0.1 : speed;
      interval = setInterval(() => {
        tetraminoDispatch({ type: "move-down" });
      }, currentSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, turbo]);

  useEffect(() => {
    if (!isPlaying && score > 0) {
      alert(`Game Over! Score: ${score}`);
    }
  }, [isPlaying, score]);

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
        <StartBtn
          isPlaying={tetraminoState.isPlaying}
          musicPlaying={tetraminoState.musicPlaying}
          dispatch={tetraminoDispatch}
        />
      </aside>
    </div>
  );
}

export default App;
