export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone) {
  const re = /^\+?[\d\s-]{10,15}$/;
  return re.test(phone);
}

export function validateRequired(value) {
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return true;
  return value != null;
}

export function validateMinLength(value, min) {
  return typeof value === 'string' && value.length >= min;
}

export function validateMaxLength(value, max) {
  return typeof value === 'string' && value.length <= max;
}

export function validateNumber(value, min, max) {
  const num = Number(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
}

export function validateForm(fields) {
  const errors = {};
  
  for (const [key, rules] of Object.entries(fields)) {
    for (const rule of rules) {
      if (rule.required && !validateRequired(rule.value)) {
        errors[key] = rule.message || `${key} is required`;
        break;
      }
      if (rule.email && rule.value && !validateEmail(rule.value)) {
        errors[key] = rule.message || 'Invalid email address';
        break;
      }
      if (rule.phone && rule.value && !validatePhone(rule.value)) {
        errors[key] = rule.message || 'Invalid phone number';
        break;
      }
      if (rule.minLength && !validateMinLength(rule.value, rule.minLength)) {
        errors[key] = rule.message || `Minimum ${rule.minLength} characters`;
        break;
      }
    }
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
