import { UserRole } from './types/UserRole';

export type SingleValidation = { isValid: boolean; errorMessage: string };
export type LoginValidation = {
  email: SingleValidation;
  password: SingleValidation;
  isValidInput: boolean;
};
export type SignUpValidation = {
  name: SingleValidation;
  email: SingleValidation;
  phone: SingleValidation;
  birthDate: SingleValidation;
  password: SingleValidation;
  role: SingleValidation;
  isValidInput: boolean;
};

const emailValidator = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+[.][a-zA-Z]+([.][a-zA-Z]+)?');
const passwordValidator = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{7,}');
const nameValidator = new RegExp('[A-Za-z]+[ ][A-Za-z]+([ ][a-z A-Z]+)*');
const phoneValidator = new RegExp('[0-9]{8,}');
const birthDateValidator = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}');

export const validateLogin = (email: string, password: string) => {
  const isValidEmail = emailValidator.test(email);
  const isValidPassword = passwordValidator.test(password);

  return {
    email: {
      isValid: isValidEmail,
      errorMessage: isValidEmail ? '' : 'Insira um endereço de e-mail válido!',
    },
    password: {
      isValid: isValidPassword,
      errorMessage: isValidPassword ? '' : 'Insira uma senha válida!',
    },
    isValidInput: isValidEmail && isValidPassword,
  };
};

export const validateSignUp = (
  name: string,
  email: string,
  phone: string,
  birthDate: string,
  password: string,
  role: UserRole,
) => {
  const birth = new Date(birthDate);
  const minBirthDate = new Date('1900-01-01');
  const today = new Date();

  const isValidName = nameValidator.test(name);
  const isValidEmail = emailValidator.test(email);
  const isValidPhone = phoneValidator.test(phone) && Number(phone) > 0;
  const isValidBirthDate = birthDateValidator.test(birthDate) && birth > minBirthDate && birth < today;
  const isValidPassword = passwordValidator.test(password);
  const isValidRole = role == 'admin' || role == 'user';

  return {
    name: {
      isValid: isValidName,
      errorMessage: isValidName ? '' : 'Insira um nome válido!',
    },
    email: {
      isValid: isValidEmail,
      errorMessage: isValidEmail ? '' : 'Insira um endereço de e-mail válido!',
    },
    phone: {
      isValid: isValidPhone,
      errorMessage: isValidPhone ? '' : 'Insira um número de telefone válido!',
    },
    birthDate: {
      isValid: isValidBirthDate,
      errorMessage: isValidBirthDate ? '' : 'Insira uma data válida (formato: YYYY-MM-DD)!',
    },
    password: {
      isValid: isValidPassword,
      errorMessage: isValidPassword ? '' : 'Insira uma senha válida!',
    },
    role: {
      isValid: isValidRole,
      errorMessage: isValidRole ? '' : 'Selecione um Cargo!',
    },
    isValidInput: isValidName && isValidEmail && isValidPhone && isValidBirthDate && isValidPassword && isValidRole,
  };
};
