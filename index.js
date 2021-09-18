import { pipe, always, applySpec, last } from 'ramda';

const getValue = (obj, prop) => {
  return obj[prop] ? obj[prop] : obj;
};

const bubbleSort = (arr, sortKey = null) => {
  let noSwaps;
  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if ((arr[j + 1] ? getValue(arr[j + 1], sortKey) : arr[j + 1]) < (arr[j] ? getValue(arr[j], sortKey) : arr[j])) {
        // Swap
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
        // Make 'noSwaps' false
        noSwaps = false;
      }
    }
    // End the iterations if there were no swaps made in one full pass
    if (noSwaps) {
      break;
    }
  }
  return arr;
}

const binarySearch = (sortedArray, sortKey, value) => {
  let left = 0;
  let right = 1;

  while ((sortedArray[right] ? getValue(sortedArray[right], sortKey) : sortedArray[right]) < getValue(value, sortKey)) {
    left = right;
    right = right * 2;
  }

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);

    if ((sortedArray[middle] ? getValue(sortedArray[middle], sortKey) : sortedArray[middle]) === getValue(value, sortKey)) {
      // found the key
      return middle;
    } else if ((sortedArray[middle] ? getValue(sortedArray[middle], sortKey) : sortedArray[middle]) < getValue(value, sortKey)) {
      // continue searching to the right
      left = middle + 1;
    } else {
      // search searching to the left
      right = middle - 1;
    }
  }
  // key wasn't found
  return -1;
}

const findIndex = (list, sortKey) => value => {
  if (value == null || value == undefined) {
    return -1;
  }
  if (value - 1 < list.length && list[value - 1] == value) {
    return value - 1;
  }

  return binarySearch(list, sortKey, value);
}

const sortArray = (list, sortKey) => {
  // SHOULD IMPLEMENT
  return bubbleSort(list, sortKey);
};

const insert = (list, sortKey, item) => {
  // SHOULD IMPLEMENT a preserving order insertion
  const value = getValue(item, sortKey);
  const firstValue = getValue(list[0], sortKey);
  const lastValue = getValue(list[list.length - 1], sortKey);

  if (value <= firstValue) {
    list.unshift(item);
  } else if (value >= lastValue) {
    // list[list.length] = item;
    list.push(item);
  } else {
    const existingIndex = findIndex(list, sortKey)(item);
    if (existingIndex > -1) {
      list.splice(existingIndex, 0, item);
    } else {
      const getIndexOfDirectNearElement = (list, value) => {
        let start = 0;
        let end = list.length - 1;

        while (start <= end) {
          let middle = Math.floor((start + end) / 2);

          if (start + 1 == end) {
            if (value < list[start]) {
              return start;
            }
            return end;
          } else if (list[middle] < value) {
            start = middle + 1;
          } else {
            end = middle - 1;
          }
        }
      }
      const index = getIndexOfDirectNearElement(list, value);
      list[index] > value
        ? list.splice(index, 0, item)
        : list.splice(index + 1, 0, item);
    }
  }

  return list;
}

const remove = (list, sortKey, value) => {
  // SHOULD IMPLEMENT
  const index = findIndex(list, sortKey)(value);
  if (index < 0) {
    return list;
  }

  const leftArray = list.slice(0, index);
  const rightArray = list.slice(index + 1, list.length);
  return leftArray.concat(rightArray);
}

export const List = ({ sortKey, initial, initialOrder }) => {
  const items = initialOrder ? initial : sortArray(initial, sortKey);

  return {
    items,
    findIndex: findIndex(items, sortKey),
    remove: value => List({
      sortKey,
      initial: remove(items, sortKey, value),
      initialOrder: true
    }),

    insert: item => List({
      sortKey,
      initial: insert(items, sortKey, item),
      initialOrder: true
    })
  }
}
