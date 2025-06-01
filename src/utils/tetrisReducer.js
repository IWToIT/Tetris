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
  turbo: false,
  totalLinesCleared: 0,
  linesSinceLastSpeed: 0,
};

/**
 * reducer
 * - всегда возвращает какой-то стейт
 * - всегда возвращает новый объект состояния (почему?)
 *
 */
export function tetraminoReducer(state, action) {
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

        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        console.log("Линий очищено:", linesCleared);
        const points = [0, 100, 300, 500, 800][linesCleared];
        const newScore = state.score + points;

        // Общий счетчик (никогда не обнуляется)
        const newTotalLinesCleared = state.totalLinesCleared + linesCleared;

        // Временный счетчик (сбрасывается после 4)
        const newLinesSinceLastSpeed = state.linesSinceLastSpeed + linesCleared;

        // Проверяем, набрали ли 4 линии
        const shouldIncreaseSpeed = newLinesSinceLastSpeed >= 4;

        // Увеличиваем скорость на 10%
        const newSpeed = shouldIncreaseSpeed ? state.speed * 0.9 : state.speed;

        // Сбрасываем, если достигли 4 линий
        const resetLines = shouldIncreaseSpeed
          ? newLinesSinceLastSpeed - 4
          : newLinesSinceLastSpeed;

        return {
          ...state,
          isPlaying: !checkCollizion(clearedBoard, state.nextTetramino), // true
          board: clearedBoard,
          tetramino: state.nextTetramino,
          nextTetramino: createTetramino(),
          score: newScore,
          speed: newSpeed,
          totalLinesCleared: newTotalLinesCleared,
          linesSinceLastSpeed: resetLines,
        };
        // TODO: реализовать подсчет очков +
        // if (linesCleared > 0) {
        //   const points = [0, 100, 300, 500, 800][linesCleared];
        //   setScore((prev) => prev + points);
        // }
      }
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
    case "set-speed":
      return {
        ...state,
        speed: action.payload,
      };
    case "set-score":
      return {
        ...state,
        score: action.payload,
      };
    case "set-turbo":
      return {
        ...state,
        turbo: action.payload,
      };
    case "set-drop":
      console.log("жесткое", state.tetramino.y);
      const newTetramino = { ...state.tetramino };
      while (!checkCollizion(state.board, newTetramino, 0, 1)) {
        newTetramino.y += 1;
      }
      return { ...state, tetramino: newTetramino };
    default:
      return state;
  }
}

const str = "A man a plan a canal Panama"
function isPalindrom (el) {
  const cleanedStr = el.replace(/\s/g, '').toLowerCase()
  console.log(cleanedStr)
  const reverseString = cleanedStr.split('').reverse().join('')
  console.log(reverseString)
  if(reverseString === cleanedStr) {
    return 'yes';
  } else {
    return 'no'
  }
}

isPalindrom(str);

const baseString = "I like cats. Cats are great!";

function replaceWord(s) {
  const replacer = /\bcats\b/gi;
  const updateString = s.replace(replacer, "dogs")
  return updateString
}

replaceWord(baseString)