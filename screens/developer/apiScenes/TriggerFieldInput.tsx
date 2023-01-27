import * as React from "react";
import {
  Button,
  CheckIcon,
  Select,
  View,
  Text,
  VStack,
  HStack,
  Pressable,
} from "native-base";
import { TextInputDesc } from "../../../components/TextInputDesc";
import { ThemedTitle } from "../../../components/ThemedTitle";
import * as Types from "../../../redux/types.generated";

const { useState } = React;

interface TriggerFieldProps {
  cancelCode?: string;
  onCancel: () => void;
  onSave: (field: Types.TriggerField) => void;
}

export const TriggerFieldInput: React.FunctionComponent<TriggerFieldProps> = ({
  code,
  cancelCode,
  onCancel,
  onSave,
}) => {
  const [inputType, setInputType] = useState();
  const [inputValidataion, setInputValidation] = useState();

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <View>
      <TextInputDesc
        marginTop={0}
        text="Label"
        description="Include a leading statement — use a question where possible"
        onTextChanged={(nextValue) => {
          console.log(nextValue);
        }}
      />
      <TextInputDesc
        marginTop={10}
        text="Optional helper text"
        description="Markdown-style links allowed"
        onTextChanged={(nextValue) => console.log(nextValue)}
      />
      <TextInputDesc
        marginTop={10}
        text="Key name"
        description="in snake_case"
        onTextChanged={(nextValue) => console.log(nextValue)}
      />
      <VStack>
        <ThemedTitle>Input Type</ThemedTitle>
        <Select
          selectedValue={inputType}
          minWidth="200"
          accessibilityLabel="Choose input type"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setInputType(itemValue)}
        >
          <Select.Item label="Text input" value="text-input" />
          <Select.Item label="Dropdown list" value="dropdown" />
          {/* <Select.Item label="Location based input" value="location-input" />
          <Select.Item label="Nested dropdown list" value="nexted-dropdown" /> */}
          <Select.Item
            label="Multiple checkbox selection"
            value="multiple-checkbox-selection"
          />
        </Select>
      </VStack>
      {inputType === "text-input" && (
        <VStack>
          <ThemedTitle>Input validataion</ThemedTitle>
          <Select
            selectedValue={inputValidataion}
            minWidth="200"
            accessibilityLabel="Input validation"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setInputValidation(itemValue)}
          >
            <Select.Item label="No validation required" value="no-validation" />
            <Select.Item label="Validation required" value="need-validation" />
          </Select>
        </VStack>
      )}
      <HStack>
        <Pressable onPress={handleCancel}>
          <Text>Cancel</Text>
        </Pressable>
        <Button onPress={() => onSave({})}>Save</Button>
      </HStack>
    </View>
  );
};
