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

const { useState, useEffect } = React;

interface TriggerFieldProps {
  triggerInfo?: Types.ServiceTrigger;
  fieldInfo?: Types.TriggerField;
  cancelCode?: string;
  onCancel: () => void;
  onDelete?: (fieldId: number) => void;
  onSave: (field: Types.TriggerField) => void;
}

export const TriggerFieldInput: React.FunctionComponent<TriggerFieldProps> = ({
  triggerInfo,
  fieldInfo,
  onCancel,
  onSave,
  onDelete,
}) => {
  const [label, setLabel] = useState();
  const [helperText, setHelperText] = useState();
  const [keyName, setkeyName] = useState();
  const [inputType, setInputType] = useState();
  const [inputValidataion, setInputValidation] = useState();

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleDelete = () => {
    if (onDelete && fieldInfo?.id) onDelete(fieldInfo?.id);
  };

  useEffect(() => {
    if (!fieldInfo?.id) {
      return;
    }

    setLabel(fieldInfo?.label);
    setHelperText(fieldInfo?.helperText);
    setkeyName(fieldInfo?.keyName);
    setInputType(fieldInfo?.inputType);
    setInputValidation(fieldInfo?.validationRequired);
  }, [fieldInfo?.id]);

  return (
    <View>
      <TextInputDesc
        marginTop={0}
        value={label}
        text="Label"
        description="Include a leading statement — use a question where possible"
        onTextChanged={(nextValue: string) => {
          setLabel(nextValue);
        }}
      />
      <TextInputDesc
        marginTop={10}
        value={helperText}
        text="Optional helper text"
        description="Markdown-style links allowed"
        onTextChanged={(nextValue) => setHelperText(nextValue)}
      />
      <TextInputDesc
        marginTop={10}
        value={keyName}
        text="Key name"
        description="in snake_case"
        onTextChanged={(nextValue) => setkeyName(nextValue)}
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
          <Select.Item label="Text input" value="0" />
          <Select.Item label="Dropdown list" value="1" />
          {/* <Select.Item label="Location based input" value="location-input" />
          <Select.Item label="Nested dropdown list" value="nexted-dropdown" /> */}
          <Select.Item label="Multiple checkbox selection" value="2" />
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
        {fieldInfo ? (
          <Pressable onPress={handleDelete}>
            <Text>Delete</Text>
          </Pressable>
        ) : null}
        <HStack>
          <Pressable onPress={handleCancel}>
            <Text>Cancel</Text>
          </Pressable>
          <Button
            onPress={() =>
              onSave({
                label,
                helperText,
                keyName,
                inputType: parseInt(inputType ?? "-1", 10),
                validationRule: -1,
                validationRequired: inputValidataion === "no-validtion",
                serviceTriggerId: triggerInfo?.id,
              })
            }
          >
            Save
          </Button>
        </HStack>
      </HStack>
    </View>
  );
};
