

const emailValidator = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+[.][a-zA-Z]+([.][a-zA-Z]+)?');
const passwordValidator = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{7,}');
const nameValidator = new RegExp('[A-Za-z]+[ ][A-Za-z]+([ ][a-z A-Z]+)*');
const phoneValidator = new RegExp('[0-9]+');
const birthDateValidator = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}');

export const loginValidator = (email: string, password: string) => {
    const validation = {
        isValidEmail: emailValidator.test(email),
        isValidPassword: passwordValidator.test(password)
    }
    return validation;
}

export const signinValidator = (name: string, email: string, phone: string, birthDate: string, password: string, role: string) => {
    let isValidBirthDate = true;
    if(!birthDateValidator.test(birthDate)) {
        isValidBirthDate = false;
    }
    else {
        const birth = new Date(birthDate);
        const minBirthDate = new Date("1900-01-01");
        const today = new Date();
        isValidBirthDate = (birth > minBirthDate && birth < today);
    }
    
    const validation = {
        isValidName: nameValidator.test(name),
        isValidEmail: emailValidator.test(email),
        isValidPhone: phoneValidator.test(phone),
        isValidBirthDate: isValidBirthDate,
        isValidPassword: passwordValidator.test(password),
        isValidRole: (role == "admin" || role == "user"),
    }
    return validation;
}
