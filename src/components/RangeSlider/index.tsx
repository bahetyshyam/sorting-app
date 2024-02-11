import classNames from 'classnames';
import React, { useMemo } from 'react';

interface IProps {
  value?: number;
  onChange: (arraySize: number) => void;
  disabled: boolean;
  min?: number;
  max?: number;
  extraInputClasses?: string[];
  labelRenderFunction?: () => React.ReactNode;
}

const RangeSlider: React.FC<IProps> = ({
  value = 50,
  onChange,
  disabled,
  min,
  max,
  extraInputClasses,
  labelRenderFunction,
}) => {
  if (extraInputClasses) {
    console.log(...extraInputClasses);
  }
  const baseInputClass =
    'mr-4 h-2 w-1/4 cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700';
  const inputClass = useMemo(() => {
    return classNames(baseInputClass, [
      extraInputClasses ? extraInputClasses : [],
    ]);
  }, [extraInputClasses]);
  const onSliderValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(parseInt(e.currentTarget.value));
  };
  return (
    <div className="mt-7">
      {labelRenderFunction && labelRenderFunction()}
      <input
        onChange={onSliderValueChange}
        id="default-range"
        type="range"
        min={min || 20}
        max={max || 50}
        value={value}
        className={inputClass}
        disabled={disabled}
      ></input>
    </div>
  );
};

export default RangeSlider;
