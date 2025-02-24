import { BOARD_WIDTH } from "./gameBoard";

export const tetraminos = {
  // 0: { shape: [[0]], color: "0,0,0" },
  L: { shape: [
                [0, "L", 0],
                [0, "L", 0],
                [0, "L", "L"]
              ],
       color: '255, 128, 0'
  },
  J: { shape: [
                  [0, "L", 0],
                  [0, "L", 0],
                ["L", "L", 0]
              ],
       color: '0, 12, 255'
  },
  I: { shape: [
                [0, "I", 0, 0],
                [0, "I", 0, 0],
                [0, "I", 0, 0],
                [0, "I", 0, 0]
              ],
      color: '229, 19, 22'
  },
  Z: { shape: [
                  [0, "Z", 0],
                ["Z", "Z", 0],
                ["Z", 0, 0]
              ],
       color: '76, 176, 73' 
  },
  S: { shape: [
                [0, "S", 0],
                [0, "S", "S"],
                  [0, 0, "S"]
              ],
       color: '255, 255, 48'
},
  O: { shape: [
                ["O", "O"],
                ["O", "O"]
              ],
       color: '210, 210, 210'
  },
  T: { shape: [
                   [0, 0, 0],
                  [0, "T", 0],
                ["T", "T", "T"]
              ],
       color: '153, 77, 164'
  },
};

export const createTetramino = () => {
  const tetraminoKeys = Object.keys(tetraminos)
  const rand = tetraminoKeys[Math.floor(Math.random() * tetraminoKeys.length)]
  const selectedTetramino = tetraminos[rand];
  return {
    shape: selectedTetramino.shape,
    x: Math.floor(BOARD_WIDTH/2) - 1,
    y: 0,
    type: rand,
    color: selectedTetramino.color,
  }
}

const newTetramino = createTetramino();
console.log(newTetramino);
