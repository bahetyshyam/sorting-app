import React from 'react';
import classNames from 'classnames';
import { ElementItemColor } from '../../types';

interface IProps {
  id: string;
  value: number;
  barColor: ElementItemColor;
  isPivot?: boolean;
}

const Bar: React.FC<IProps> = ({ id, value, barColor, isPivot }) => {
  const barClass = classNames(
    ['m-0.5 w-1 sm:m-1 sm:w-3  md:m-1 md:w-4 lg:w-6'],
    {
      'bg-gray-500': barColor === 'gray',
      'bg-blue-600': barColor === 'blue',
      'bg-red-600': barColor === 'red',
    },
  );
  const pivotClassNames = classNames(
    ['m-0.5 h-1 w-1 sm:m-1 sm:w-3 sm:h-3 md:m-1 md:w-4 md:h-4 lg:w-6 lg:h-6'],
    {
      'bg-red-600': isPivot,
    },
  );
  return (
    <div key={id}>
      <div className={pivotClassNames}></div>
      <div className={barClass} style={{ height: value * 2 }}></div>
    </div>
  );
};

export default Bar;
