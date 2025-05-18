import { createBoard } from "./gameBoard";
import { createTetramino } from "./tetraminosRand";

export const initialState = {
  board: createBoard(),
  tetramino: createTetramino(),
  nextTetramino: createTetramino(),
  isPlaying: false,
  score: 0,
  speed: 800,
};
export function tetrtaminoReducer(state, action) {
  switch (action.type) {
    case "move-down":
      return {
        ...state,
        tetramino: {
          ...state.tetramino,
          y: state.tetramino.y + 1,
        },
      };
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
        isPlaying: true 
      };
    default:
      return state;
  }
}
