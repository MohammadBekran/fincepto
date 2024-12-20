import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

interface ISelectProps {
  options?: { value: string; label: string }[];
  value?: string | null | undefined;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string | undefined) => void;
  onCreate?: (name: string) => void;
}

const Select = ({
  options = [],
  value,
  placeholder,
  disabled,
  onChange,
  onCreate,
}: ISelectProps) => {
  const onSelect = (option: SingleValue<{ value: string; label: string }>) => {
    onChange(option?.value)
  };

  const currentValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <CreatableSelect
      options={options}
      value={currentValue}
      placeholder={placeholder}
      isDisabled={disabled}
      onChange={onSelect}
      onCreateOption={onCreate}
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": {
            borderColor: "#e2e8f0",
          },
        }),
      }}
    />
  );
};

export default Select;
