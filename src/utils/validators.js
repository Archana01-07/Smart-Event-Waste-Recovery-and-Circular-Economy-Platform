export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+(\.[^\s@]+)?$/.test(email);
}

export function validatePassword(password) {
  const errors = [];
  if (password.length < 8) errors.push('At least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('One number');
  return errors;
}

export function validateRequired(value, fieldName = 'Field') {
  if (!value?.toString?.()?.trim?.()) return `${fieldName} is required`;
  return null;
}
