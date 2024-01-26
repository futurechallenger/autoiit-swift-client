import * as React from 'react';
import { Button, CheckIcon, Select, View, Text, VStack, HStack, Pressable } from 'native-base';
import { TextInputDesc } from '../../../components/TextInputDesc';
import { InputTitle } from '../../../components/ThemedTitle';
import * as Types from '../../../redux/types.generated';
import { convertValidationRule, InputType, reverseValidationRule, ValidationRule } from '../../../constants/Trigger';

const { useState, useEffect } = React;

interface FieldProps {
  actionInfo?: Types.ServiceAction;
  fieldInfo?: Types.ActionOutputField;
  cancelCode?: string;
  onCancel: () => void;
  onDelete?: (fieldId: number) => void;
  onSave: (field: Types.ActionOutputField) => void;
}

export const ActionFieldInput: React.FunctionComponent<FieldProps> = ({
  actionInfo,
  fieldInfo,
  onCancel,
  onSave,
  onDelete,
}) => {
  const [label, setLabel] = useState<Types.Maybe<string> | undefined>();
  const [helperText, setHelperText] = useState<Types.Maybe<string> | undefined>();
  const [keyName, setKeyName] = useState<Types.Maybe<string> | undefined>();
  const [fieldType, setFieldType] = useState<Types.Maybe<string> | undefined>();
  // const [inputValidataion, setInputValidation] = useState();
  // const [validationRule, setValidationRule] = useState();

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
    setKeyName(fieldInfo?.keyName);
    setFieldType(fieldInfo?.fieldType != null ? '' + fieldInfo?.fieldType : undefined);
    // setInputValidation(
    //   fieldInfo?.validationRequired ? 'need-validation' : 'no-validation',
    // );
    // setValidationRule(reverseValidationRule(fieldInfo?.validationRule));
  }, [fieldInfo?.id]);

  // const renderValidation = () => {
  //   if (fieldType === InputType.TextInput) {
  //     return (
  //       <VStack marginTop={10}>
  //         <InputTitle>Input validataion</InputTitle>
  //         <Select
  //           selectedValue={inputValidataion}
  //           minWidth="200"
  //           accessibilityLabel="Input validation"
  //           _selectedItem={{
  //             bg: 'teal.600',
  //             endIcon: <CheckIcon size="5" />,
  //           }}
  //           mt={1}
  //           onValueChange={(itemValue) => setInputValidation(itemValue)}
  //         >
  //           <Select.Item label="No validation required" value="no-validation" />
  //           <Select.Item label="Validation required" value="need-validation" />
  //         </Select>
  //       </VStack>
  //     );
  //   }
  // };

  // const renderValidationRule = () => {
  //   if (
  //     fieldType === InputType.TextInput &&
  //     inputValidataion === 'need-validation'
  //   ) {
  //     return (
  //       <VStack marginTop={10}>
  //         <InputTitle>Validation rule</InputTitle>
  //         <Select
  //           selectedValue={validationRule}
  //           minWidth="200"
  //           accessibilityLabel="Validation rule"
  //           _selectedItem={{
  //             bg: 'teal.600',
  //             endIcon: <CheckIcon size="5" />,
  //           }}
  //           mt={1}
  //           onValueChange={(itemValue) => setValidationRule(itemValue)}
  //         >
  //           <Select.Item label="Text is not blank" value="no-blank" />
  //           <Select.Item
  //             label="Text with a custom regex"
  //             value="custom-regex"
  //           />
  //           <Select.Item
  //             label="Validate text using a service"
  //             value="by-service"
  //           />
  //         </Select>
  //       </VStack>
  //     );
  //   }
  // };

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
        onTextChanged={(nextValue) => setKeyName(nextValue)}
      />
      <VStack marginTop={10}>
        <InputTitle>Input Type</InputTitle>
        <Select
          selectedValue={`${fieldType ?? fieldInfo?.fieldType}`}
          minWidth="200"
          accessibilityLabel="Choose input type"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setFieldType(itemValue)}
        >
          <Select.Item label="Text input" value="0" />
          <Select.Item label="Dropdown list" value="1" />
          {/* <Select.Item label="Location based input" value="location-input" />
          <Select.Item label="Nested dropdown list" value="nexted-dropdown" /> */}
          <Select.Item label="Multiple checkbox selection" value="2" />
        </Select>
      </VStack>
      {/* {renderValidation()}
      {renderValidationRule()} */}
      <HStack w="full" justifyContent="space-between" alignItems="center" marginY={10}>
        {fieldInfo ? (
          <Pressable onPress={handleDelete}>
            <Text>Delete</Text>
          </Pressable>
        ) : (
          <View />
        )}
        <HStack justifyContent="space-between" alignItems="center">
          <Pressable onPress={handleCancel} marginRight={10}>
            <Text>Cancel</Text>
          </Pressable>
          <Button
            onPress={() =>
              onSave({
                id: fieldInfo?.id,
                label,
                helperText,
                keyName,
                fieldType: parseInt(fieldType ?? '-1', 10),
                // validationRule: convertValidationRule(validationRule),
                // validationRequired: inputValidataion === 'need-validtion',
                serviceApiActionId: actionInfo?.id,
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
