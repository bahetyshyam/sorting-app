import React from 'react';
import classNames from 'classnames';
import { ElementItemColor } from '../../App';

interface IProps {
  id: string;
  value: number;
  barColor: ElementItemColor;
}

const Bar: React.FC<IProps> = ({ id, value, barColor }) => {
  const barClass = classNames(['w-6 m-2 rounded'], {
    'bg-gray-500': barColor === 'gray',
    'bg-blue-600': barColor === 'blue',
  });
  return (
    <div key={id} className={barClass} style={{ height: value * 2 }}></div>
  );
};

// .bar {
//   width: 20px;
//   margin: 5px;
//   background-color: lightblue;
//   border-radius: 5px;
// }

export default Bar;
