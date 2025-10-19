import ReactSelect, {
  type Props as SelectProps,
  type MultiValue,
  type OptionProps,
  type DropdownIndicatorProps,
  type MultiValueGenericProps,
} from "react-select";
import { ChevronDown, Check, ChevronUp } from "lucide-react";
import { components } from "react-select";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps
  extends Omit<SelectProps<SelectOption, boolean>, "onChange"> {
  onChange?: (value: string[] | string | null) => void;
}

const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectOption, boolean>
) => {
  return (
    <components.DropdownIndicator {...props}>
      {props.isFocused ? (
        <ChevronUp size={16} className="text-muted-foreground" />
      ) : (
        <ChevronDown size={16} className="text-muted-foreground" />
      )}
    </components.DropdownIndicator>
  );
};

const Option = (props: OptionProps<SelectOption, boolean>) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-3 w-3 items-center justify-center border ${
            props.isSelected
              ? "bg-black border-black"
              : "border-muted-foreground"
          }`}
        >
          {props.isSelected && <Check size={12} className="text-white" />}
        </div>
        <span className="text-sm font-medium">{props.label}</span>
      </div>
    </components.Option>
  );
};

const MultiValueContainer = (
  props: MultiValueGenericProps<SelectOption, boolean>
) => {
  const { data, selectProps } = props;
  const values = selectProps.value as MultiValue<SelectOption>;
  const index = values.findIndex((v) => v.value === data.value);
  const isLast = index === values.length - 1;

  return (
    <components.MultiValueContainer {...props}>
      <span className="text-sm font-medium">
        {data.label}
        {!isLast && <span className="tracking-widest">, </span>}
      </span>
    </components.MultiValueContainer>
  );
};

export const Select = ({ onChange, ...props }: CustomSelectProps) => {
  const handleChange = (
    newValue: MultiValue<SelectOption> | SelectOption | null
  ) => {
    if (!onChange) return;

    if (props.isMulti) {
      const values = (newValue as MultiValue<SelectOption>).map(
        (option) => option.value
      );
      onChange(values);
    } else {
      onChange(newValue ? (newValue as SelectOption).value : null);
    }
  };

  return (
    <ReactSelect
      {...props}
      onChange={handleChange}
      components={{ DropdownIndicator, Option, MultiValueContainer }}
      classNamePrefix="react-select"
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      isClearable
      unstyled
      classNames={{
        control: ({ isFocused }) =>
          `!bg-[#EFF1F6] hover:!bg-secondary/80 !rounded-lg !min-h-[48px] !px-3 !shadow-none !border-2 ${
            isFocused ? "border-black !bg-white" : "!border-transparent"
          }`,
        valueContainer: () => "!p-2 gap-0",
        input: () => `!m-0 !p-0 !text-foreground cursor-pointer`,
        placeholder: () => "!text-sm",
        singleValue: () => "!text-foreground !text-sm",
        multiValue: () => "!bg-transparent !rounded-md !p-0 !m-0",
        multiValueLabel: () => "!hidden",
        multiValueRemove: () => "!hidden",
        menu: () => "!bg-popover !rounded-lg !shadow-lg !mt-2 !z-[99]",
        menuList: () => "!p-2",
        option: ({ isFocused }) =>
          `!bg-transparent !text-foreground !cursor-pointer !px-3 !py-2 !rounded-md !text-sm ${
            isFocused ? "!bg-accent" : ""
          }`,
        indicatorSeparator: () => "!hidden",
        dropdownIndicator: () => "!p-2 !text-muted-foreground cursor-pointer",
        clearIndicator: () =>
          " !text-muted-foreground cursor-pointer size-4 translate-y-[-2px]",
      }}
    />
  );
};
