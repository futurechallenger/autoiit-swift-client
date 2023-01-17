import { Picker } from "@react-native-picker/picker";
import React from "react";

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
  return (
    <Picker>
      {options.map((el) => (
        <Picker.Item label={el.name} value={el.id} />
      ))}
    </Picker>
  );
};
