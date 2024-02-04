import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import { ElementItem } from '../types';
import { createRandomNumberArray } from './util';

export type AppContextType = {
  sortArray: ElementItem[];
  isAppSorting: boolean;
  arraySize: number;
  setSortArray: (sortArray: ElementItem[]) => void;
  setIsAppSorting: (isAppSorting: boolean) => void;
  setArraySize: (arraySize: number) => void;
  resetArray?: () => void;
  startSorting?: () => void;
  dispatch: React.Dispatch<ActionType>;
} | null;

type InitialStateType = {
  sortArray: ElementItem[];
  isAppSorting: boolean;
  arraySize: number;
};

type ActionType =
  | { type: 'UPDATE_SORT_ARRAY'; payload: ElementItem[] }
  | { type: 'UPDATE_IS_APP_SORTING'; payload: boolean }
  | { type: 'UPDATE_ARRAY_SIZE'; payload: number };

export const AppContext = createContext<AppContextType>(null);

export function useAppContext() {
  return useContext(AppContext);
}

const initialState: InitialStateType = {
  sortArray: [],
  isAppSorting: false,
  arraySize: 20,
};

function reducer(
  state: InitialStateType,
  action: ActionType,
): InitialStateType {
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

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    resetArray();
  }, [state.arraySize]);

  async function bblSort(arr: ElementItem[]) {
    updateIsAppSorting(true);
    for (let i = 0; i < arr.length; i++) {
      // Last i elements are already in place
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Checking if the item at present iteration
        // is greater than the next iteration
        arr[j].color = 'blue';
        arr[j + 1].color = 'blue';
        updateSortArray([...arr]);
        if (arr[j].value > arr[j + 1].value) {
          // If the condition is true
          // then swap them
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(() => {
                updateSortArray([...arr]);
              });
            }, 10);
          });
        }
        arr[j].color = 'gray';
        arr[j + 1].color = 'gray';
        updateSortArray([...arr]);
      }
    }
    updateIsAppSorting(false);
  }

  const resetArray = useCallback(() => {
    updateSortArray(createRandomNumberArray(state.arraySize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.arraySize]);

  const startSorting = () => {
    bblSort(state.sortArray);
  };
  const value: AppContextType = {
    sortArray: state.sortArray,
    isAppSorting: state.isAppSorting,
    arraySize: state.arraySize,
    setSortArray: updateSortArray,
    setIsAppSorting: updateIsAppSorting,
    setArraySize: updateArraySize,
    resetArray,
    startSorting,
    dispatch,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
