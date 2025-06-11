//Задача: "Кто быстрее?"
// Дан массив из N целых чисел - скорость участников марафона.
// Найти k самых быстрых (т.е. k минимальных чисел по значению и вывести их в отсортированном порядке)

//Ограничения:
// - Использовать Heap sort
// - После выбора k минимальных - отсортировать их с помощью методов вставками или выбором

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function FastestHeap(arr, k) {
  const sortArr = heapSort(arr);
  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(sortArr[i]);
  }
  return result;
}

///////Сортировка выбором

function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

function FastestSelection(arr, k) {
  const sortArr = selectionSort(arr);
  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(sortArr[i]);
  }
  return result;
}

console.log(FastestHeap([12, 4, 8, 10, 2, 7], 3));
console.log(FastestSelection([12, 4, 8, 10, 2, 7], 3));
