export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];
  const validSymbols = ['.', '*', '#', '@', '$', '%', '&'];
  
  // Check length
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  // Check for numbers
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  // Check for cyber-symbols
  if (!password.split('').some(char => validSymbols.includes(char))) {
    errors.push('Password must contain at least one cyber-symbol (. * # @ $ % &)');
  }
  
  // Check for invalid characters
  const invalidChars = password
    .split('')
    .filter(char => 
      !/[a-zA-Z0-9]/.test(char) && !validSymbols.includes(char)
    );
  
  if (invalidChars.length > 0) {
    errors.push(`Invalid characters detected: ${[...new Set(invalidChars)].join(' ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};