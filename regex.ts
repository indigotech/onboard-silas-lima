import { UserRole } from './types/UserRole';

const emailValidator = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+[.][a-zA-Z]+([.][a-zA-Z]+)?');
const passwordValidator = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{7,}');
const nameValidator = new RegExp('[A-Za-z]+[ ][A-Za-z]+([ ][a-z A-Z]+)*');
const phoneValidator = new RegExp('[0-9]{8,}');
const birthDateValidator = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}');

export const loginValidator = (email: string, password: string) => {
  const isValidEmail = emailValidator.test(email);
  const isValidPassword = passwordValidator.test(password);

  return {
    isValidEmail: isValidEmail,
    isValidPassword: isValidPassword,
    isValidInput: isValidEmail && isValidPassword,
  };
};

export const signinValidator = (
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
  const isValidRole = role === 'admin' || role === 'user';

  return {
    isValidName: isValidName,
    isValidEmail: isValidEmail,
    isValidPhone: isValidPhone,
    isValidBirthDate: isValidBirthDate,
    isValidPassword: isValidPassword,
    isValidRole: isValidRole,
    isValidInput: isValidName && isValidEmail && isValidPhone && isValidBirthDate && isValidPassword && isValidRole,
  };
};
