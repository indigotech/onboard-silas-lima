export const emailValidator = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+[.][a-zA-Z]+([.][a-zA-Z]+)?');
export const passwordValidator = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{7,}');