export interface SingleValidation {
  isValid: boolean;
  errorMessage: string;
}

export interface LoginValidation {
  email: SingleValidation;
  password: SingleValidation;
  isValidInput: boolean;
}
    
export interface SignUpValidation {
  name: SingleValidation;
  email: SingleValidation;
  phone: SingleValidation;
  birthDate: SingleValidation;
  password: SingleValidation;
  role: SingleValidation;
  isValidInput: boolean;
}
