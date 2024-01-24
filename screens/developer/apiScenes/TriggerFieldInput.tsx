import * as React from 'react';
import { Input, Button, CheckIcon, Select, View, Text, VStack, HStack, Pressable } from 'native-base';
import { TextInputDesc } from '../../../components/TextInputDesc';
import { InputTitle } from '../../../components/ThemedTitle';
import * as Types from '../../../redux/types.generated';
import { convertValidationRule, InputType, reverseValidationRule, ValidationRule } from '../../../constants/Trigger';
import { DropdownLabelValueInput } from '../../../components/DropdownLabelValueInput';

const { useState, useEffect } = React;

interface FieldProps {
  triggerInfo?: Types.ServiceTrigger;
  fieldInfo?: Types.TriggerField | Types.ExposeField;
  cancelCode?: string;
  onCancel: () => void;
  onDelete?: (fieldId: number) => void;
  onSave: (field: Types.TriggerField) => void;
}

export const TriggerFieldInput: React.FunctionComponent<FieldProps> = ({
  triggerInfo,
  fieldInfo,
  onCancel,
  onSave,
  onDelete,
}) => {
  const [label, setLabel] = useState<string | undefined | null>();
  const [helperText, setHelperText] = useState<string | undefined | null>();
  const [keyName, setKeyName] = useState<string | undefined | null>();
  const [inputType, setInputType] = useState<string | undefined | null>();
  const [inputSourceType, setInputSourceType] = useState<string | undefined | null>();
  const [inputSourceApi, setInputSourceApi] = useState<string | undefined | null>();
  const [inputValidation, setInputValidation] = useState<string | undefined | null>();
  const [validationRule, setValidationRule] = useState<string | undefined | null>();

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
    setInputType(fieldInfo?.inputType == null ? undefined : '' + fieldInfo?.inputType);
    setInputSourceType(fieldInfo?.inputSourceType ? '' + fieldInfo?.inputSourceType : undefined);
    setInputSourceApi(fieldInfo?.inputSourceApi);
    setInputValidation(fieldInfo?.validationRequired ? 'need-validation' : 'no-validation');
    setValidationRule(reverseValidationRule(fieldInfo?.validationRule ?? undefined));
  }, [fieldInfo?.id]);

  const renderValidation = () => {
    if (inputType === InputType.TextInput) {
      return (
        <VStack marginTop={10}>
          <InputTitle>Input validation</InputTitle>
          <Select
            selectedValue={inputValidation ?? undefined}
            minWidth="200"
            accessibilityLabel="Input validation"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setInputValidation(itemValue)}
          >
            <Select.Item label="No validation required" value="no-validation" />
            <Select.Item label="Validation required" value="need-validation" />
          </Select>
        </VStack>
      );
    }
  };

  const renderValidationRule = () => {
    if (inputType === InputType.TextInput && inputValidation === 'need-validation') {
      return (
        <VStack marginTop={10}>
          <InputTitle>Validation rule</InputTitle>
          <Select
            selectedValue={validationRule ?? undefined}
            minWidth="200"
            accessibilityLabel="Validation rule"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setValidationRule(itemValue)}
          >
            <Select.Item label="Text is not blank" value="no-blank" />
            <Select.Item label="Text with a custom regex" value="custom-regex" />
            <Select.Item label="Validate text using a service" value="by-service" />
          </Select>
        </VStack>
      );
    }
  };

  const renderDataSource = () => {
    if (inputType === InputType.DropdownList || inputType === InputType.MultipleCheckboxSelection) {
      return (
        <>
          <InputTitle>Datasource for dropdown list</InputTitle>
          <Select
            selectedValue={inputSourceType ?? undefined}
            accessibilityLabel="Datasource for dropdown list"
            onValueChange={(value) => setInputSourceType(value)}
          >
            <Select.Item label="Options specified here" value="0" />
            <Select.Item label="Options from your api" value="1" />
          </Select>
        </>
      );
    }
  };

  return (
    <View>
      <TextInputDesc
        marginTop={0}
        value={label}
        text="Label"
        description="Include a leading statement — use a question where possible"
        onTextChanged={(nextValue: string | undefined) => {
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
          selectedValue={inputType ?? undefined}
          minWidth="200"
          accessibilityLabel="Choose input type"
          _selectedItem={{
            bg: 'teal.600',
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
        {renderDataSource()}
        {inputSourceType === '1' ? <Input value={inputSourceApi ?? undefined} /> : <DropdownLabelValueInput />}
      </VStack>
      {renderValidation()}
      {renderValidationRule()}
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
                inputType: parseInt(inputType ?? '-1', 10),
                inputSourceType: parseInt(inputSourceType ?? '0', 10),
                inputSourceApi,
                validationRule: convertValidationRule(validationRule ?? undefined),
                validationRequired: inputValidation === 'need-validation',
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
