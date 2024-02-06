import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import { ElementItem, SortingAlgorithm } from '../types';
import { createRandomNumberArray, initiateSorting } from './util';

export type AppContextType = {
  sortArray: ElementItem[];
  isAppSorting: boolean;
  arraySize: number;
  sortingAlgorithm: SortingAlgorithm;
  sortingSpeed: number; //milliseconds
  setSortArray: (sortArray: ElementItem[]) => void;
  setIsAppSorting: (isAppSorting: boolean) => void;
  setArraySize: (arraySize: number) => void;
  setSortingAlgorithm: (SortingAlgorithm: SortingAlgorithm) => void;
  setSortingSpeed: (speed: number) => void;
  resetArray?: () => void;
  startSorting?: () => void;
  dispatch: React.Dispatch<ActionType>;
};

type StateType = {
  sortArray: ElementItem[];
  isAppSorting: boolean;
  arraySize: number;
  sortingAlgorithm: SortingAlgorithm;
  sortingSpeed: number;
};

type ActionType =
  | { type: 'UPDATE_SORT_ARRAY'; payload: ElementItem[] }
  | { type: 'UPDATE_IS_APP_SORTING'; payload: boolean }
  | { type: 'UPDATE_ARRAY_SIZE'; payload: number }
  | { type: 'UPDATE_SORTING_ALGORITHM'; payload: SortingAlgorithm }
  | { type: 'UPDATE_SORTING_SPEED'; payload: number };

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  return useContext(AppContext);
};

const initialState: StateType = {
  sortArray: [],
  isAppSorting: false,
  arraySize: 20,
  sortingAlgorithm: 'bubbleSort',
  sortingSpeed: 50,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'UPDATE_SORT_ARRAY': {
      return {
        ...state,
        sortArray: action.payload,
      };
    }
    case 'UPDATE_IS_APP_SORTING': {
      return {
        ...state,
        isAppSorting: action.payload,
      };
    }
    case 'UPDATE_ARRAY_SIZE': {
      return {
        ...state,
        arraySize: action.payload,
      };
    }
    case 'UPDATE_SORTING_ALGORITHM': {
      return {
        ...state,
        sortingAlgorithm: action.payload,
      };
    }
    case 'UPDATE_SORTING_SPEED': {
      return {
        ...state,
        sortingSpeed: action.payload,
      };
    }
    default:
      throw new Error();
  }
}

interface IProps {
  children: ReactNode;
}
export const AppProvider: FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateSortArray = (sortArray: ElementItem[]) => {
    dispatch({ type: 'UPDATE_SORT_ARRAY', payload: sortArray });
  };
  const updateIsAppSorting = (isAppSorting: boolean) => {
    dispatch({ type: 'UPDATE_IS_APP_SORTING', payload: isAppSorting });
  };
  const updateArraySize = (arraySize: number) => {
    dispatch({ type: 'UPDATE_ARRAY_SIZE', payload: arraySize });
  };
  const updateSortingAlgorithm = (sortingAlgorithm: SortingAlgorithm) => {
    dispatch({ type: 'UPDATE_SORTING_ALGORITHM', payload: sortingAlgorithm });
  };
  const updateSortingSpeed = (sortingSpeed: number) => {
    dispatch({ type: 'UPDATE_SORTING_SPEED', payload: sortingSpeed });
  };

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    resetArray();
  }, [state.arraySize]);

  const resetArray = useCallback(() => {
    updateSortArray(createRandomNumberArray(state.arraySize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.arraySize]);

  const startSorting = () => {
    initiateSorting({
      sortArray: state.sortArray,
      updateIsAppSorting,
      updateSortArray,
      sortingAlgorithm: state.sortingAlgorithm,
      sortingSpeed: state.sortingSpeed,
    });
  };
  const value: AppContextType = {
    sortArray: state.sortArray,
    isAppSorting: state.isAppSorting,
    arraySize: state.arraySize,
    sortingAlgorithm: state.sortingAlgorithm,
    sortingSpeed: state.sortingSpeed,
    setSortArray: updateSortArray,
    setIsAppSorting: updateIsAppSorting,
    setArraySize: updateArraySize,
    setSortingAlgorithm: updateSortingAlgorithm,
    setSortingSpeed: updateSortingSpeed,
    resetArray,
    startSorting,
    dispatch,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
