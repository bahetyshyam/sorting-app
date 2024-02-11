import { useEffect, useMemo } from 'react';
import Button from './components/Button';
import Bar from './components/Bar';
import './App.css';
import { AppContextType, useAppContext } from './contexts/AppContext';
import RangeSlider from './components/RangeSlider';
import RadioButtons from './components/RadioButtons';
import { createRandomNumberArray } from './contexts/util';
import { SortingAlgorithm } from './types';

const radioButtonItems = [
  {
    id: 'bubbleSort',
    value: 'bubbleSort',
    label: 'Bubble Sort',
    isDefault: false,
  },
  {
    id: 'quickSort',
    value: 'quickSort',
    label: 'Quick Sort',
    isDefault: false,
  },
];

function App() {
  const {
    sortArray,
    isAppSorting,
    arraySize,
    sortingAlgorithm,
    sortingSpeed,
    setSortArray,
    setArraySize,
    setSortingAlgorithm,
    setSortingSpeed,
    resetArray,
    startSorting,
  } = useAppContext() as AppContextType;

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

  const radioItemsProps = useMemo(() => {
    const radioItems = radioButtonItems.map((item) => {
      return {
        ...item,
        isDefault: item.value === sortingAlgorithm,
      };
    });
    return radioItems;
  }, [sortingAlgorithm]);

  function onChangeRadioButton(value: string) {
    setSortingAlgorithm(value as SortingAlgorithm);
  }
  function onChangeRangeSlider(value: number) {
    setArraySize(value);
  }
  function onChangeSortingSpeedRangeSlider(value: number) {
    setSortingSpeed(value);
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
      <RadioButtons
        radioItems={radioItemsProps}
        onChange={onChangeRadioButton}
        disabled={isAppSorting}
      />
      <RangeSlider
        value={arraySize}
        onChange={onChangeRangeSlider}
        disabled={isAppSorting}
        labelRenderFunction={() => (
          <div className="text-base font-medium text-gray-900">
            Array Size {arraySize}
          </div>
        )}
      />
      <RangeSlider
        value={sortingSpeed}
        onChange={onChangeSortingSpeedRangeSlider}
        disabled={isAppSorting}
        min={10}
        max={200}
        extraInputClasses={['rotate-180']}
        labelRenderFunction={() => (
          <div className="text-base font-medium text-gray-900">
            Sorting Speed {sortingSpeed} ms
          </div>
        )}
      />

      <div className="mt-6 flex justify-center">
        {sortArray.map((item) => {
          return (
            <Bar
              key={item.id}
              id={item.id}
              value={item.value}
              barColor={item.color}
              isPivot={item.isPivot}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
