export type ElementItemColor = 'gray' | 'blue' | 'red';
export type ElementItem = {
  value: number;
  id: string;
  color: ElementItemColor;
  isPivot?: boolean;
};
export type SortingAlgorithm = 'bubbleSort' | 'quickSort';
