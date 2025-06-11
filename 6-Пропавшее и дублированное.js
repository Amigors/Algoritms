//Задача "Найти пропавшее и дублированное"
//Дан массив arr длины n, содержащий числа от 1 до n.
//Однако: одно число встречается дважды, одного числа не хватает

//Найти:
// - Какое число повторяется.
// - Какое число отсутствует

//Ограничения:
// - Время: O(n log n) или лучше
// - Использовать сортировку

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [],
    i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

function MissAndDouble(arr) {
  const sortArr = quickSort(arr);
  console.log(sortArr);
  const miss = [];
  const double = [];
  let temp = 0;
  let prevNum = sortArr[0];
  for (let i = 1; i < sortArr.length; i++) {
    if (sortArr[i] === prevNum) {
      double.push(sortArr[i]);
    } else if (sortArr[i] - prevNum !== 1) {
      temp = prevNum;
      while (temp < sortArr[i] - 1) {
        temp += 1;
        miss.push(temp);
      }
    }
    prevNum = sortArr[i];
  }
  return `Повторяются: ${double}, Отсутствуют: ${miss}`;
}

console.log(MissAndDouble([3, 1, 2, 5, 3, 7]));
