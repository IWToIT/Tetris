export const checkCollizion = (board, tetramino, moveX = 0, moveY = 0) => {
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

export const clearLines = (board) => {
  let linesCleared = 0;
  console.log(linesCleared);
  const newBoard = board.filter((row) => {
    const isLineFull = !row.some(
      (cell) => cell === "0" || (typeof cell === "object" && cell.type === "0")
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
