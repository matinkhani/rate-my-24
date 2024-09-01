export const SHARED_STRING = {
  REQUIRED_FIELD: "This field is required",
  MIN_LENGTH: (min: number) =>
    `The minimum length of this field should be ${min} characters.`,
  MAX_LENGTH: (max: number) =>
    `The maximum length of this field should be ${max} characters.`,
  LENGTH_FIELD: (length: number) =>
    `This field should be exactly ${length} characters.`,
  INVALID_EMAIL: "Please enter a valid email",
  CHECK_FIELD: "Please check this field",
  PASSWORD_MISSMATCH: "Password do not match",
};
