import { ElementItem, SortingAlgorithm } from '../types';
import { v4 as uuidv4 } from 'uuid';

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function createRandomNumberExceptZero(upperLimit: number) {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * upperLimit);
  } while (randomNumber === 0);
  return randomNumber;
}

export function createRandomNumberArray(
  size: number = 20,
  upperLimit: number = 250,
): ElementItem[] {
  return Array.from({ length: size }, () => ({
    value: createRandomNumberExceptZero(upperLimit),
    id: uuidv4(),
    color: 'gray',
  }));
}

interface SortArrayParams {
  sortArray: ElementItem[];
  updateIsAppSorting: (isAppSorting: boolean) => void;
  updateSortArray: (sortArray: ElementItem[]) => void;
  sortingAlgorithm: SortingAlgorithm;
  sortingSpeed: number;
}
export function initiateSorting(sortArrayParamsObject: SortArrayParams) {
  const { sortingAlgorithm } = sortArrayParamsObject;
  switch (sortingAlgorithm) {
    case 'bubbleSort':
      bubbleSort(sortArrayParamsObject);
      break;
    case 'quickSort':
      initiateQuickSort(sortArrayParamsObject);
      break;
    default:
      throw new Error('Invalid sorting algorithm type');
  }
}

async function bubbleSort({
  sortArray,
  updateIsAppSorting,
  updateSortArray,
  sortingSpeed,
}: SortArrayParams) {
  updateIsAppSorting(true);
  for (let i = 0; i < sortArray.length; i++) {
    // Last i elements are already in place
    for (let j = 0; j < sortArray.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      sortArray[j].color = 'blue';
      sortArray[j + 1].color = 'blue';
      updateSortArray([...sortArray]);
      await delay(sortingSpeed);

      if (sortArray[j].value > sortArray[j + 1].value) {
        // If the condition is true
        // then swap them
        const temp = sortArray[j];
        sortArray[j] = sortArray[j + 1];
        sortArray[j + 1] = temp;
        updateSortArray([...sortArray]);
        await delay(sortingSpeed);
      }
      sortArray[j].color = 'gray';
      sortArray[j + 1].color = 'gray';
      updateSortArray([...sortArray]);
      await delay(sortingSpeed);
    }
  }
  updateIsAppSorting(false);
}

async function initiateQuickSort({
  sortArray,
  updateIsAppSorting,
  updateSortArray,
  sortingSpeed,
}: SortArrayParams) {
  async function swap(
    items: ElementItem[],
    leftIndex: number,
    rightIndex: number,
  ) {
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    updateSortArray([...items]);
    await delay(sortingSpeed);
  }
  async function partition(items: ElementItem[], left: number, right: number) {
    const pivot = items[Math.floor((right + left) / 2)]; //middle element
    pivot.isPivot = true;
    updateSortArray([...items]);
    await delay(sortingSpeed);
    let i = left; //left pointer
    let j = right; //right pointer
    items[i].color = 'blue';
    items[j].color = 'blue';
    updateSortArray([...items]);
    await delay(sortingSpeed);
    while (i <= j) {
      while (items[i].value < pivot.value) {
        items[i].color = 'gray';
        i++;
        items[i].color = 'blue';
        updateSortArray([...items]);
        await delay(sortingSpeed);
      }
      while (items[j].value > pivot.value) {
        items[j].color = 'gray';
        j--;
        items[j].color = 'blue';
        updateSortArray([...items]);
        await delay(sortingSpeed);
      }
      if (i <= j) {
        await swap(items, i, j); //swapping two elements
        items[i].color = 'gray';
        items[j].color = 'gray';
        i++;
        j--;
        updateSortArray([...items]);
      }
    }
    if (items[i]) {
      items[i].color = 'gray';
    }
    if (items[j]) {
      items[j].color = 'gray';
    }
    updateSortArray([...items]);
    await delay(sortingSpeed);
    pivot.isPivot = false;
    return i;
  }

  async function quickSort(items: ElementItem[], left: number, right: number) {
    let index;
    if (items.length > 1) {
      index = await partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        await quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        await quickSort(items, index, right);
      }
    }
    return items;
  }
  // first call to quick sort
  updateIsAppSorting(true);
  const sortedArray = await quickSort(sortArray, 0, sortArray.length - 1);
  updateSortArray([...sortedArray]);
  updateIsAppSorting(false);
}
