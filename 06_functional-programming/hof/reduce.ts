function* reduce<T, U>(
  array: T[],
  callback: (accumulator: U, currentValue: T, currentIndex: number, array: T[]) => U,
  initialValue: U,
): IterableIterator<U> {
  let index = 0;
  let accumulator = initialValue;

  while (index < array.length) {
    accumulator = callback(accumulator, array[index], index, array);
    yield accumulator;
    index++;
  }
}

async function* reduceAsync<T, U>(
  arr: T[],
  callback: (acc: U, val: T, index: number) => Promise<U>,
  initialValue: U,
) {
  let acc = initialValue;
  let index = 0;
  while (index < arr.length) {
    acc = await callback(acc, arr[index], index);
    yield acc;
    index++;
  }
}

const arr = [1, 2, 3, 4, 5];
const lazySum = reduce(arr, (a, b) => a + b, 0);
console.log(Array.from(lazySum));
