export function validateNonEmpty(
  value: string,
  fieldName: string,
): string | null {
  if (value.trim().length === 0) {
    return `${fieldName} is required.`;
  }
  return null;
}

export function validateEmail(value: string): string | null {
  const nonEmptyError = validateNonEmpty(value, "Email");
  if (nonEmptyError) {
    return nonEmptyError;
  } else if (!/\S+@\S+\.\S+/.test(value)) {
    return "Invalid email address.";
  }
  return null;
}
