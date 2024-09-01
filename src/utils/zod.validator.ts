import { SHARED_STRING } from "@/constants/string.constants";
import { z } from "zod";

export const ERRORS = {
  REQUIRED: SHARED_STRING.REQUIRED_FIELD,
  MIN: (min: number) => SHARED_STRING.MIN_LENGTH(min),
  MAX: (max?: number) =>
    max ? SHARED_STRING.MAX_LENGTH(max) : SHARED_STRING.CHECK_FIELD,
  LENGTH: (length?: number) =>
    length ? SHARED_STRING.LENGTH_FIELD(length) : SHARED_STRING.CHECK_FIELD,
  INVALID_EMAIL: SHARED_STRING.INVALID_EMAIL,
  PASSWORD_MISSMATCH: SHARED_STRING.PASSWORD_MISSMATCH,
};

// Dynamic Min-Max Validator
// Minimum is required but Maximum is optional
export const MIN_MAX_VALIDATOR = (
  min: number,
  max?: number,
  lengthErrorMessage: boolean = true
) => {
  const getMessage = (type: "MIN" | "MAX") => {
    return type === "MIN"
      ? lengthErrorMessage
        ? ERRORS.MIN(min)
        : ERRORS.REQUIRED
      : lengthErrorMessage
      ? ERRORS.MAX(max!)
      : ERRORS.REQUIRED;
  };

  const validator = z.string({ required_error: ERRORS.REQUIRED });

  if (min) {
    return validator.min(min, { message: getMessage("MIN") });
  } else {
    if (max) {
      return validator.max(max, { message: getMessage("MAX") });
    } else {
      return validator;
    }
  }
};

// Length Validator
export const LENGTH_VALIDATOR = (
  length: number,
  notShowLengthInMessage?: boolean
) => {
  const validate = z
    .string({
      message: ERRORS.REQUIRED,
    })
    .length(length, {
      message: ERRORS.LENGTH(notShowLengthInMessage ? undefined : length),
    });
  return validate;
};

// Email Validator
export const EMAIL_VALIDATOR = () => {
  return z.string({ required_error: ERRORS.REQUIRED }).email({
    message: ERRORS.INVALID_EMAIL,
  });
};
