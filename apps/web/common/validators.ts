import parsePhoneNumberFromString from "libphonenumber-js";

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isValidEmail(value: string): boolean {
  return /\S+@\S+\.\S+/.test(value);
}

export function isValidPhoneNumber(value: string): boolean {
  return parsePhoneNumberFromString(value)?.isValid() === true;
}

export function isValidDate(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

export function validateNonEmpty(
  value: string,
  fieldName: string,
): string | null {
  if (!isNonEmpty(value)) {
    return `${fieldName} is required.`;
  }
  return null;
}

export function validateEmail(value: string): string | null {
  const nonEmptyError = validateNonEmpty(value, "Email");
  if (nonEmptyError) {
    return nonEmptyError;
  } else if (!isValidEmail(value)) {
    return "Invalid email address.";
  }
  return null;
}

export function validatePhoneNumber(value: string): string | null {
  const nonEmptyError = validateNonEmpty(value, "Phone Number");
  if (nonEmptyError) {
    return nonEmptyError;
  } else if (!isValidPhoneNumber(value)) {
    return "Invalid phone number.";
  }
  return null;
}
