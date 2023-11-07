import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from './components/Button';
import Bar from './components/Bar';
import './App.css';

export type ElementItemColor = 'gray' | 'blue';
export type ElementItem = {
  value: number;
  id: string;
  color: ElementItemColor;
};

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
  const [sortArray, setSortArray] = useState<ElementItem[]>(
    createRandomNumberArray(),
  );
  const [isSorting, setIsSorting] = useState<boolean>(false);

  async function bblSort(arr: ElementItem[]) {
    setIsSorting(true);
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
    setIsSorting(false);
  }

  const resetArray = useCallback(() => {
    setSortArray(createRandomNumberArray());
  }, []);

  const startSorting = () => {
    bblSort(sortArray);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <Button onClick={startSorting} disabled={isSorting}>
          Start
        </Button>
        <Button onClick={resetArray} disabled={isSorting}>
          Reset
        </Button>
      </div>

      <div className="mt-6 flex justify-center">
        {sortArray.map((item) => {
          return <Bar id={item.id} value={item.value} barColor={item.color} />;
        })}
      </div>
    </div>
  );
}

export default App;
