import { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from './components/Button';
import Bar from './components/Bar';
import './App.css';
import { ElementItem } from './types';
import { useAppContext } from './contexts/AppContext';

function createRandomNumberArray(
  size: number = 20,
  upperLimit: number = 100,
): ElementItem[] {
  return Array.from({ length: size }, () => ({
    value: Math.floor(Math.random() * upperLimit),
    id: uuidv4(),
    color: 'gray',
  }));
}

function App() {
  const { sortArray, isAppSorting, setIsAppSorting, setSortArray } =
    useAppContext();

  useEffect(() => {
    setSortArray(createRandomNumberArray());
  }, []);

  async function bblSort(arr: ElementItem[]) {
    setIsAppSorting(true);
    for (let i = 0; i < arr.length; i++) {
      // Last i elements are already in place
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Checking if the item at present iteration
        // is greater than the next iteration
        arr[j].color = 'blue';
        arr[j + 1].color = 'blue';
        setSortArray([...arr]);
        if (arr[j].value > arr[j + 1].value) {
          // If the condition is true
          // then swap them
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(() => {
                setSortArray([...arr]);
              });
            }, 50);
          });
        }
        arr[j].color = 'gray';
        arr[j + 1].color = 'gray';
        setSortArray([...arr]);
      }
    }
    setIsAppSorting(false);
  }

  const resetArray = useCallback(() => {
    setSortArray(createRandomNumberArray());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startSorting = () => {
    bblSort(sortArray);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <Button onClick={startSorting} disabled={isAppSorting}>
          Start
        </Button>
        <Button onClick={resetArray} disabled={isAppSorting}>
          Reset
        </Button>
      </div>

      <div className="mt-6 flex justify-center">
        {sortArray.map((item) => {
          return (
            <Bar
              key={item.id}
              id={item.id}
              value={item.value}
              barColor={item.color}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
