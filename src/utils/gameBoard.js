export const BOARD_WITH = 10;
export const BOARD_HEIGHT = 20;

export const createBoard = () => {
  return Array.from(Array(BOARD_HEIGHT).fill('0'), () => { 
      const array = new Array(BOARD_WITH).fill(['0']);
      return array;
  })
}