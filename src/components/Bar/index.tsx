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
  const barClass = classNames(['w-6 m-1'], {
    'bg-gray-500': barColor === 'gray',
    'bg-blue-600': barColor === 'blue',
    'bg-red-600': barColor === 'red',
  });
  const pivotClassNames = classNames(['w-6 m-1'], {
    'bg-red-600': isPivot,
  });
  return (
    <div key={id}>
      <div className={pivotClassNames} style={{ height: 20 }}></div>
      <div className={barClass} style={{ height: value * 2 }}></div>
    </div>
  );
};

export default Bar;
