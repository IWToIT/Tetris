/**
 * state:
 * - tetramino
 * - isPlaying
 */
function moveDownReducer(state, action) {
  switch (action.type) {
    case "move-down":
      return {
        ...state,
        tetramino: {
          ...state.tetramino,
          y: state.tetramino.y + 1,
        },
        // isPlaying: {
        //   ...isPlaying
        // }
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
        isPlaying: action.payload
      }
    default:
      return state;
  }
}

// {
//     tetramino: {},
//     isPlaying: 
// }