import { describe, it, expect } from "vitest";
import { BOARD_HEIGHT, BOARD_WIDTH, createBoard } from "../utils/gameBoard";
import { tetraminos, createTetramino } from "../utils/tetraminosRand";
import { checkCollizion } from "../App";

describe("checkCollizion", () => {
  it("no collizion when figure in the center of the board", () => {
    // arrange
    const board = createBoard();
    const tetramino = createTetramino({
      x: Math.floor(BOARD_WIDTH / 2) - 1,
      y: Math.floor(BOARD_HEIGHT / 2) - 1,
    });

    // act
    const hasCollizion = checkCollizion(board, tetramino, 0, 1);

    // assert
    expect(hasCollizion).toBe(false);
  });

  // 1. Фигура находится слева от доски, и мы двигаем её влево - есть коллизия
  it("collision when figure is left of board and moving left", () => {
    // arrange
    const board = createBoard();
    const tetramino = createTetramino({
      x: -1,
    });

    // act
    const hasCollizion = checkCollizion(board, tetramino, -1, 0);

    // assert
    expect(hasCollizion).toBe(true);
  });
  // 2. Фигура находится справа от доски, и мы двигаем её вправо - есть коллизии
  it("collision when figure is right of board and moving right", () => {
    // arrange
    const board = createBoard();
    const tetramino = createTetramino({
      x: BOARD_WIDTH,
    });

    // act
    const hasCollizion = checkCollizion(board, tetramino, 1, 0);

    // assert
    expect(hasCollizion).toBe(true);
  });
  // 3. Фигура находится снизу доски, и мы двигаем её вниз - есть коллизии
  it("collision when figure is below board and moving dowm", () => {
    // arrange
    const board = createBoard();
    const tetramino = createTetramino({
      x: BOARD_HEIGHT,
    });

    // act
    const hasCollizion = checkCollizion(board, tetramino, 0, 1);

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

// TODO
// 1. функция должна принимать в качестве параметра массив sort([4,3,1,2])
// 2. покрыть функцию sort тестами - 3 теста
// - покрыть пограничные значения (какими будут пограничные значения)
function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

sort([4,3,1,2]);

describe("sortFunc", () => {
  it("whether the function sorts the array correctly", () => {
    const input = [4, 3, 1, 2];
    const expected = [1, 2, 3, 4];
    expect(sort(input)).toEqual(expected);
  });
  it("array is already sorted", () => {
    const input = [1, 2, 3, 4];
    const expected = [1, 2, 3, 4];
    expect(sort(input)).toEqual(expected);
  });
  it("negative numbers", () => {
    const input = [-3, -1, -4, -2];
    const expected = [-4, -3, -2, -1];
    expect(sort(input)).toEqual(expected);
  });
  it("empty array check", () => {
    expect(sort([])).toEqual([]);
  });
  it("single number array", () => {
    expect(sort([1])).toEqual([1]);
  });
});

//поиск максимального значения без методов JS
const array = [3, 8, 2, 5, 10, 1];

let maxValue = array[0];
for (let i = 0; i < array.length; i++) {
  if (array[i] > maxValue) {
    maxValue = array[i];
  }
}

console.log(maxValue);

//уникальные значения массива через Set
const arr = [1, 2, 2, 3, 4, 4, 5];
let s = new Set(arr);
let arr2 = [...s];

console.log(arr2);

//уникальные значения массива через includes
const arra = [1, 2, 2, 3, 4, 4, 5];
let arra1 = [];
for (let i = 0; i < arra.length; i++) {
  if (!arra1.includes(arra[i])) {
    arra1.push(arra[i]);
  }
}

console.log(arra1);

//уникальные значения массива через array.filter
const a = [1, 2, 2, 3, 4, 4, 5];
let a1 = a.filter((e, i, self) => i === self.indexOf(e));

console.log(a1);




