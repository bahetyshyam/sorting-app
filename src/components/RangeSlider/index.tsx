import React from 'react';

interface IProps {
  value?: number;
  updateArraySize: (arraySize: number) => void;
  disabled: boolean;
}

const RangeSlider: React.FC<IProps> = ({
  value = 50,
  updateArraySize,
  disabled,
}) => {
  const onSliderValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    updateArraySize(parseInt(e.currentTarget.value));
  };
  return (
    <>
      <input
        onChange={onSliderValueChange}
        id="default-range"
        type="range"
        min={20}
        max={50}
        value={value}
        className="mt-7 h-2 w-1/4 cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
        disabled={disabled}
      ></input>
    </>
  );
};

export default RangeSlider;
