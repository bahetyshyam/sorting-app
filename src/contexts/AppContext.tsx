import { createContext, useContext, useState, FC, ReactNode } from 'react';
import { ElementItem } from '../types';

export type AppContextType = {
  sortArray: ElementItem[];
  isAppSorting: boolean;
  setSortArray: (sortArray: ElementItem[]) => void;
  setIsAppSorting: (isAppSorting: boolean) => void;
};

const contextDefaultValue: AppContextType = {
  sortArray: [],
  isAppSorting: false,
  setSortArray: () => {},
  setIsAppSorting: () => {},
};

export const AppContext = createContext<AppContextType>(contextDefaultValue);

export const useAppContext = () => {
  return useContext(AppContext);
};

interface IProps {
  children: ReactNode;
}
export const AppProvider: FC<IProps> = ({ children }) => {
  const [sortArray, setSortArray] = useState<ElementItem[]>(
    contextDefaultValue.sortArray,
  );
  const [isAppSorting, setIsAppSorting] = useState<boolean>(
    contextDefaultValue.isAppSorting,
  );
  const updateSortArray = (sortArray: ElementItem[]) => {
    setSortArray(sortArray);
  };
  const updateIsAppSorting = (isAppSorting: boolean) => {
    setIsAppSorting(isAppSorting);
  };
  const value = {
    sortArray,
    isAppSorting,
    setSortArray: updateSortArray,
    setIsAppSorting: updateIsAppSorting,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
