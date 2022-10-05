import ReactSelect from "react-select";

type Option = {
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
        container: () => ({
          width: "100%",
        }),
      }}
      menuPlacement="auto"
      menuPosition="fixed"
      options={props.options}
      placeholder={props.placeholder}
      onChange={(value) => props?.onChange(value)}
    />
  );
};

export default Select;
