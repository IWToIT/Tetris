import React, { useEffect, useState, useCallback } from "react";
import Board from "./components/Board";
import Display from "./components/Display";
import StartBtn from "./components/StartBtn";
import NextTetramino from "./components/NextTetramino";
import "./scss/app.scss";

import { createBoard } from "./utils/gameBoard";
import { createTetramino } from "./utils/tetraminosRand";

function App() {
  const [board, setBoard] = useState(createBoard);
  const [tetramino, setTetramino] = useState(createTetramino);
  const [nextTetramino, setNextTetramino] = useState(createTetramino);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [score, setScore] = useState(0);

  const clearLines = (board) => {
    let linesCleared = 0;
    const newBoard = board.filter((row) => {
      const isLineFull = !row.some(
        (cell) =>
          cell === "0" || (typeof cell === "object" && cell.type === "0")
      );
      if (isLineFull) {
        linesCleared++;
        return false;
      }
      return true;
    });

    for (let i = 0; i < linesCleared; i++) {
      newBoard.unshift(new Array(board[0].length).fill("0"));
    }

    return { newBoard, linesCleared };
  };

  const moveDown = useCallback(() => {
    if (!isPlaying) return;

    if (!checkCollizion(board, tetramino, 0, 1)) {
      setTetramino((prev) => ({
        ...prev,
        y: prev.y + 1,
      }));
    } else {
      const newBoard = board.map((row) => [...row]);
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
              newBoard[boardY][boardX] = {
                type: tetramino.type,
                color: tetramino.color,
              };
            }
          }
        });
      });

      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      setBoard(clearedBoard);

      if (linesCleared > 0) {
        const points = [0, 100, 300, 500, 800][linesCleared];
        setScore((prev) => prev + points);
      }

      setTetramino(nextTetramino);
      setNextTetramino(createTetramino());

      if (checkCollizion(newBoard, nextTetramino)) {
        setIsPlaying(false);
        alert("Game Over!");
      }
    }
  }, [isPlaying, board, tetramino, nextTetramino]);

  const moveLeft = useCallback(() => {
    if (!isPlaying) return;

    if (!checkCollizion(board, tetramino, -1, 0)) {
      setTetramino((prev) => ({
        ...prev,
        x: prev.x - 1,
      }));
    }
  }, [isPlaying, board, tetramino]);

  const moveRight = useCallback(() => {
    if (!isPlaying) return;

    if (!checkCollizion(board, tetramino, 1, 0)) {
      setTetramino((prev) => ({
        ...prev,
        x: prev.x + 1,
      }));
    }
  }, [isPlaying, board, tetramino]);

  const rotate = useCallback(() => {
    if (!isPlaying) return;

    const rotatedShape = tetramino.shape[0].map((_, index) =>
      tetramino.shape.map((row) => row[index]).reverse()
    );

    if (!checkCollizion(board, { ...tetramino, shape: rotatedShape })) {
      setTetramino((prev) => ({
        ...prev,
        shape: rotatedShape,
      }));
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
    if (isPlaying) {
      interval = setInterval(() => {
        // dispatch({type: 'move-down'}) //использовать useReducer
        moveDown();
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, moveDown]);


  const handleStart = () => {
    setIsPlaying(true);
    setTetramino(createTetramino());
    setBoard(createBoard());
    setSpeed(800);
    setScore(0);
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

const checkCollizion = (board, tetramino, moveX = 0, moveY = 0) => {
  const { shape, x, y } = tetramino;

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] !== 0) {
        const newX = x + col + moveX;
        const newY = y + row + moveY;

        if (newX < 0 || newX >= board[0].length || newY >= board.length) {
          return true;
        }

        if (newY >= 0) {
          const cell = board[newY][newX];
          if (cell !== "0" && (typeof cell === "object" ? cell.type : cell)) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

// describe("checkCollizion", () => {
//   test("should return true if tetramino collides with the board", () => {
//     // AAA
//     // Создаём доску
//     // Создаём тетрамино
//     // Arrange — подготовка данных

//     // Act — вызываем функцию, которую хотим протестировать
//     // const hasCollizion = checkCollizion(board, tetramino)

//     // Assert — проверяем результат
//     // expect(hasCollizion).toBe(true);

//   });
// });

export default App;
