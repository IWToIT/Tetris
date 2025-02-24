export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const createBoard = () => {
  return Array.from({ length: BOARD_HEIGHT }, () => 
    Array.from({ length: BOARD_WIDTH }, () => '0')
  );
};