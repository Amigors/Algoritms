//Задача: "Поиск в двойке"
// Дан отсортированный массив целых чисел.
// Найти, существует ли такая пара чисел, что их сумма равна target

//Ограничения:
// - Использовать два указателя
// - Без вложенных циклов

function findPairs(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) {
      return true;
    } else if (sum < target) {
      left++;
    } else if (sum > target) {
      right--;
    }
  }
  return false;
}

console.log(findPairs([1, 2, 4, 6, 10], 8)); // true
console.log(findPairs([1, 2, 4, 6, 10], 15)); // false
