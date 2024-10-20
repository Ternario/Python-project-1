export const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const REGEX_PASSWORD = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;

export const INITIAL_SIGN_UP_STATE = {
    userName: { name: "", isValid: false },
    userEmail: { email: "", isValid: false },
    userPassword: {
        password: "",
        isValidRequirements: {
            firstRequire: false,
            secondRequire: false,
            thirdRequire: false,
        },
    },
    userConfirmPassword: { confirmPassword: "", isValid: true },
};

export const INITIAL_IS_EXISTS = { name: false, email: false };

export const INITIAL_SIGN_IN_STATE = {
    isFill: true,
    userEmail: "",
    userPassword: "",
};
