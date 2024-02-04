import React from 'react';
import classNames from 'classnames';
import { ElementItemColor } from '../../types';

interface IProps {
  id: string;
  value: number;
  barColor: ElementItemColor;
}

const Bar: React.FC<IProps> = ({ id, value, barColor }) => {
  const barClass = classNames(['w-6 m-1'], {
    'bg-gray-500': barColor === 'gray',
    'bg-blue-600': barColor === 'blue',
  });
  return (
    <div key={id} className={barClass} style={{ height: value * 2 }}></div>
  );
};

export default Bar;
