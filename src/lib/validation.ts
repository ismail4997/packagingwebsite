export function normalizePhone(input: string) {
  return input.replace(/[\s().-]/g, "");
}

export function isPakistaniMobile(input: string) {
  let value = normalizePhone(input);
  if (value.startsWith("+92")) value = `0${value.slice(3)}`;
  else if (value.startsWith("92")) value = `0${value.slice(2)}`;
  return /^03\d{9}$/.test(value);
}

export function isInternationalPhone(input: string) {
  const value = normalizePhone(input);
  if (value.startsWith("+92") || isPakistaniMobile(input)) return false;
  return /^\+[1-9]\d{7,14}$/.test(value);
}

export function isValidPhone(input: string) {
  return isPakistaniMobile(input) || isInternationalPhone(input);
}

export const phoneHint =
  "Use a Pakistani mobile such as 0300 1234567, or an international number starting with +.";
