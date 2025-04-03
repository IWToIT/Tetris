import { describe, it, expect } from 'vitest';
import { BOARD_HEIGHT, BOARD_WIDTH, createBoard } from "../utils/gameBoard";
import { tetraminos, createTetramino } from '../utils/tetraminosRand';
import { checkCollizion } from '../App';


describe('checkCollizion', () => {
  it('no collizion when figure in the center of the board', () => {
    // arrange
    const board = createBoard();
    const tetramino = createTetramino();
    tetramino.y = Math.floor(BOARD_HEIGHT/2) - 1;
    
    // act
    const hasCollizion = checkCollizion(board, tetramino, 0, 1) 
    
    // assert
    expect(hasCollizion).toBe(false);
  });
  
  // 1. Фигура находится слева от доски, и мы двигаем её влево - есть коллизия
  it('collision when figure is left of board and moving left', () => {
    // arrange
    const board = createBoard();
    const tetramino = createTetramino();
    tetramino.x = -1;
    
    // act
    const hasCollizion = checkCollizion(board, tetramino, -1, 0) 
    
    // assert
    expect(hasCollizion).toBe(true);
  });
  // 2. Фигура находится справа от доски, и мы двигаем её вправо - есть коллизии
  it('collision when figure is right of board and moving right', () => {
    // arrange
    const board = createBoard();
    const tetramino = createTetramino();
    tetramino.x = BOARD_WIDTH;
    
    // act
    const hasCollizion = checkCollizion(board, tetramino, 1, 0) 
    
    // assert
    expect(hasCollizion).toBe(true);
  });
  // 3. Фигура находится снизу доски, и мы двигаем её вниз - есть коллизии
  it('collision when figure is below board and moving dowm', () => {
    // arrange
    const board = createBoard();
    const tetramino = createTetramino();
    tetramino.x = BOARD_HEIGHT;
    
    // act
    const hasCollizion = checkCollizion(board, tetramino, 0, 1) 
    
    // assert
    expect(hasCollizion).toBe(true);
  });
});



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