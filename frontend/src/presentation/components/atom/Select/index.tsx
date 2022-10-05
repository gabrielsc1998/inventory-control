import ReactSelect from "react-select";

export type Option = {
  label: string;
  value: unknown;
};

interface SelectProps {
  placeholder?: string;
  options: Array<Option>;
  onChange?: (value: Option) => void;
}

const Select = (props: SelectProps): JSX.Element => {
  return (
    <ReactSelect
      styles={{
        container: (base) => ({
          ...base,
          width: "100%",
          fontSize: "15px",
        }),
        control: (base) => ({
          ...base,
          height: "30px",
        }),
      }}
      menuPlacement="auto"
      menuPosition="fixed"
      options={props.options}
      placeholder={props.placeholder}
      onChange={(value) => props?.onChange && props.onChange(value)}
    />
  );
};

export default Select;
