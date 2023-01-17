import React from "react";
import { StyleSheet } from "react-native";

// import Select from "react-select";

interface Props {
  placeholder: string | undefined;
  options: any[];
  onSelectChange: (index: number | undefined) => void;
}

export const ThemedPicker: React.FunctionComponent<Props> = ({
  options,
  placeholder,
  onSelectChange,
}) => {
  let items = options.map((o) => ({ value: o.id, label: o.name }));
  items = [{ value: -1, label: placeholder ?? "" }, ...items];
  return (
    <select
      style={styles.select}
      title="Select"
      onChange={(ev) => {
        ev.preventDefault();
        console.log("Select value", ev);
        if (onSelectChange) {
          onSelectChange(ev?.target?.options?.selectedIndex);
        }
      }}
    >
      {items.map((el) => (
        <option value={el.value}>{el.label}</option>
      ))}
    </select>
  );
};

const styles = StyleSheet.create({
  select: {
    color: "rgb(115,115,115)",
    height: "30px",
    fontSize: "large",
    paddingLeft: "5px",
  },
});
