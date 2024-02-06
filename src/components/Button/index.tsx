import React, { useMemo } from 'react';
import classNames from 'classnames';

interface IProps {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<IProps> = ({ children, onClick, disabled }) => {
  const baseButtonClass =
    'mx-3 w-20 md:w-36 rounded-full bg-blue-500 px-4 py-2 text-sm md:text-base font-semibold text-white shadow-md hover:cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75';
  const buttonClass = useMemo(() => {
    return classNames(baseButtonClass, {
      'cursor-not-allowed opacity-50': disabled,
      'hover:bg-blue-500': disabled,
    });
  }, [disabled]);
  return (
    <button onClick={onClick} className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
};

const MemoizedButton = React.memo(Button);

export default MemoizedButton;
