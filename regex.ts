const emailValidator = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+[.][a-zA-Z]+([.][a-zA-Z]+)?');
const passwordValidator = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{7,}');

export const loginValidator = (email: string, password: string) => {
    const validation = {
        isValidEmail: emailValidator.test(email),
        isValidPassword: passwordValidator.test(password)
    }
    return validation;
}
