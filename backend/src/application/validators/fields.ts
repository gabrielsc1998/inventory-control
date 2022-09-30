type HasAllFieldsInput = {
  dto: Record<string, any>;
  expectedFields: Array<string>;
};

export const hasAllFields = (input: HasAllFieldsInput): void | string => {
  let fieldError = undefined;
  input.expectedFields.some((key) => {
    if (!input.dto[key]) {
      fieldError = key;
      return true;
    }
    return false;
  });
  return fieldError;
};
