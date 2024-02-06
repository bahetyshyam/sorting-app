import React, { useEffect, useId, useMemo, useState } from 'react';

interface IProps {
  radioItems: RadioItemsType[];
  onChange?: (radioValue: string) => void;
  disabled?: boolean;
}

type RadioItemsType = {
  id: string;
  value: string;
  label: string;
  isDefault?: boolean;
};

const RadioButtons: React.FC<IProps> = ({ radioItems, onChange, disabled }) => {
  const defaultRadioValue = useMemo(() => {
    if (radioItems.length === 0) {
      return '';
    }
    const item = radioItems.find((item) => item.isDefault);
    if (item) {
      return item.value;
    }
    return radioItems[0].value;
  }, [radioItems]);
  const [radioValue, setRadioValue] = useState<string>(defaultRadioValue);
  const [nameForRadio] = useId();
  useEffect(() => {
    if (onChange) {
      onChange(radioValue);
    }
  }, [radioValue]);
  function onRadioValueChange(e: React.FormEvent<HTMLInputElement>) {
    setRadioValue(e.currentTarget.value);
  }
  return (
    <div className="mt-6 flex items-center justify-center">
      {radioItems.map(({ id, value, label }) => {
        return (
          <div key={id} className="mr-4 flex items-center">
            <input
              checked={radioValue === value}
              onChange={onRadioValueChange}
              id={id}
              type="radio"
              value={value}
              name={nameForRadio}
              className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-blue-600"
              disabled={disabled}
            />
            <label
              htmlFor={id}
              className="text-gray-90 ms-2 cursor-pointer text-base font-medium"
            >
              {label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioButtons;
