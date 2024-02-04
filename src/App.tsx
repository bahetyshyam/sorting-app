import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from './components/Button';
import Bar from './components/Bar';
import './App.css';
import { ElementItem } from './types';
import { useAppContext } from './contexts/AppContext';
import RangeSlider from './components/RangeSlider';

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
  const {
    sortArray,
    isAppSorting,
    arraySize,
    setSortArray,
    setArraySize,
    resetArray,
    startSorting,
  } = useAppContext();

  useEffect(() => {
    setSortArray(createRandomNumberArray());
  }, []);

  function handleStartClick() {
    if (startSorting) {
      startSorting();
    }
  }

  function handleResetClick() {
    if (resetArray) {
      resetArray();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <Button onClick={handleStartClick} disabled={isAppSorting}>
          Start
        </Button>
        <Button onClick={handleResetClick} disabled={isAppSorting}>
          Reset
        </Button>
      </div>
      <RangeSlider
        value={arraySize}
        updateArraySize={setArraySize}
        disabled={isAppSorting}
      />

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
