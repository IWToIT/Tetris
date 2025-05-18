import { createBoard } from "./gameBoard";
import { createTetramino } from "./tetraminosRand";
import { checkCollizion, clearLines } from "./utils";

export const initialState = {
  board: createBoard(),
  tetramino: createTetramino(),
  nextTetramino: createTetramino(),
  isPlaying: false,
  score: 0,
  speed: 800,
};

/**
 * reducer
 * - всегда возвращает какой-то стейт
 * - всегда возвращает новый объект состояния (почему?)
 *
 */
export function tetrtaminoReducer(state, action) {
  switch (action.type) {
    case "move-down": {
      if (!state.isPlaying) return { ...state };

      if (!checkCollizion(state.board, state.tetramino, 0, 1)) {
        return {
          ...state,
          tetramino: {
            ...state.tetramino,
            y: state.tetramino.y + 1,
          },
        };
      } else {
        const newBoard = state.board.map((row) => [...row]);
        // Наносим тетромино на доску, потому что есть коллизия
        state.tetramino.shape.forEach((row, yOffset) => {
          row.forEach((value, xOffset) => {
            if (value) {
              const boardY = state.tetramino.y + yOffset;
              const boardX = state.tetramino.x + xOffset;
              if (
                boardY >= 0 &&
                boardY < state.board.length &&
                boardX >= 0 &&
                boardX < state.board[0].length
              ) {
                newBoard[boardY][boardX] = {
                  type: state.tetramino.type,
                  color: state.tetramino.color,
                };
              }
            }
          });
        });

        const { newBoard: clearedBoard } = clearLines(newBoard);

        return {
          ...state,
          isPlaying: !checkCollizion(clearedBoard, state.nextTetramino), // true
          board: clearedBoard,
          tetramino: state.nextTetramino,
          nextTetramino: createTetramino(),
        };
        // TODO: реализовать подсчет очков
        // if (linesCleared > 0) {
        //   const points = [0, 100, 300, 500, 800][linesCleared];
        //   setScore((prev) => prev + points);
        // }
      }

      // TODO: перенести в App.jsx
      // alert("Game Over!");
    }
    case "move-left":
      return {
        ...state,
        tetramino: {
          ...state.tetramino,
          x: state.tetramino.x - 1,
        },
      };
    case "move-right":
      return {
        ...state,
        tetramino: {
          ...state.tetramino,
          x: state.tetramino.x + 1,
        },
      };
    case "set-tetramino":
      return {
        ...state,
        tetramino: action.payload,
      };
    case "set-nextTetramino":
      return {
        ...state,
        nextTetramino: action.payload,
      };
    case "rotate":
      return {
        ...state,
        tetramino: {
          ...state.tetramino,
          shape: action.payload,
        },
      };
    case "set-isPlaying":
      return {
        ...state,
        isPlaying: action.payload,
      };
    case "set-board":
      return {
        ...state,
        board: action.payload,
      };
    case "reset-game":
      return {
        ...initialState,
        isPlaying: true,
      };
    default:
      return state;
  }
}
