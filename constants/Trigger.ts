export const InputType = {
  TextInput: "0",
  DropdownList: "1",
  MultipleCheckboxSelection: "2",
};

export const ValidationRule = {
  TextIsNotBlank: "0",
  CustomRegex: "1",
  ByService: "3",
};

export const convertValidationRule = (vr: string | undefined): number => {
  if (!vr) {
    return -1;
  }

  if (vr === ValidationRule.TextIsNotBlank) {
    return 0;
  } else if (vr === ValidationRule.CustomRegex) {
    return 1;
  } else if (vr === ValidationRule.ByService) {
    return 2;
  }

  return -1;
};

export const reverseValidationRule = (
  ruleNum: number | undefined
): string | undefined => {
  if (!ruleNum) {
    return undefined;
  }

  if (ruleNum === 0) {
    return ValidationRule.TextIsNotBlank;
  } else if (ruleNum === 1) {
    return ValidationRule.CustomRegex;
  } else if (ruleNum === 2) {
    return ValidationRule.ByService;
  }

  return undefined;
};
