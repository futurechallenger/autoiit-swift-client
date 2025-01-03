import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

// import Select from "react-select";

// TODO: refactor to support placeholder
interface Props {
  // placeholder: string | undefined;
  options: any[];
  onSelectChange: (index: number | undefined) => void;
}

export const ThemedPicker: React.FunctionComponent<Props> = ({
  options,
  // placeholder,
  onSelectChange,
}) => {
  let items = [{ value: -1, label: '' }];
  if (options && options.length > 0) {
    items = options.map((o) => ({ value: o.id, label: o.name }));
  }

  useEffect(() => {
    if (onSelectChange && items[0].value !== -1) {
      onSelectChange(items?.[0]);
    }
  }, [items[0].value]);

  return (
    <select
      style={styles.select}
      title="Select"
      onChange={(ev) => {
        ev.preventDefault();
        if (onSelectChange) {
          const selectedIndex = ev?.target?.options?.selectedIndex;
          const selectedItem =
            selectedIndex === void 0 || selectedIndex === null
              ? null
              : items[ev?.target?.options?.selectedIndex];
          onSelectChange(selectedItem);
        }
      }}
    >
      {items.map((el, index) => (
        <option key={el.value} value={el.value}>
          {el.label}
        </option>
      ))}
    </select>
  );
};

const styles = StyleSheet.create({
  select: {
    color: 'rgb(115,115,115)',
    height: '30px',
    fontSize: 'large',
    paddingLeft: '5px',
  },
});
