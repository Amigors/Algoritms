//Реализовать структуру одномерного и многомерного массивов

const oneArray = [1, 2, 3, 4, 5];

// Добавление элемента
oneArray.push(6);
oneArray.unshift(0);

// Удаление элемента
oneArray.pop();
oneArray.shift();

// Поиск элемента
const index = oneArray.indexOf(3);
const includes = oneArray.includes(4);

/////////////////////////

const multiArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Добавление элемента
multiDimensionalArray.push([10, 11, 12]);
multiDimensionalArray[1].push(7);

// Удаление элемента
multiDimensionalArray.pop();
multiDimensionalArray[0].pop();

// Поиск элемента
function findInMultiArray(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === value) {
        return { row: i, col: j };
      }
    }
  }
  return null;
}
