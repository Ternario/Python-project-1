import { useState } from "react";

import styles from "../../AuthorizationForm.module.css";

import Button from "../../../UI/Button";
import CloseButton from "../../../UI/CloseButton";

import * as defaultState from "../../defaultSettings.mjs";

export default function SignUpForm({ isExists, resetIsExists, registrationRequest, setSignWindow }) {
    const [state, setState] = useState(defaultState.INITIAL_SIGN_UP_STATE);

    const validateData = (e) => {
        e.preventDefault();

        if (state.userPassword.password !== state.userConfirmPassword.confirmPassword) {
            setState((prevState) => ({
                ...prevState,
                userConfirmPassword: {
                    confirmPassword: prevState.userConfirmPassword.confirmPassword,
                    isValid: false,
                },
            }));
            return;
        }

        registrationRequest(e);
    };

    return (
        <div className={styles.FormContainer}>
            <CloseButton setSignWindow={setSignWindow} />
            <h2>REGISTRATION</h2>
            <form className={styles.Form} onSubmit={(e) => validateData(e)}>
                {isExists.name && (
                    <div className={styles.InfoWrapper}>
                        <p className={styles.Wrong}>A user with this name already exists, please choose another user name</p>
                    </div>
                )}
                {isExists.email && (
                    <div className={styles.InfoWrapper}>
                        <p className={styles.Wrong}>A user with this email already exists, please choose another email</p>
                    </div>
                )}
                <div className={styles.InputWrapper}>
                    <input
                        className={styles.TextInput}
                        type="text"
                        id="registName"
                        placeholder="Enter Username "
                        value={state.userName.name}
                        onChange={(e) =>
                            setState((prevState) => ({
                                ...prevState,
                                userName: {
                                    name: e.target.value,
                                    isValid: e.target.value.length < 3 || e.target.value.length > 20 ? false : true,
                                },
                            }))
                        }
                    />
                    <div className={styles.InfoWrapper}>
                        <p className={state.userName.isValid ? styles.Right : styles.Wrong}>User name must be between 3 and 20 letters long</p>
                    </div>
                </div>
                <div className={styles.InputWrapper}>
                    <input
                        className={styles.TextInput}
                        type="text"
                        id="registEmail"
                        placeholder="Enter email "
                        value={state.userEmail.email}
                        onChange={(e) =>
                            setState((prevState) => ({
                                ...prevState,
                                userEmail: {
                                    email: e.target.value,
                                    isValid: defaultState.REGEX_EMAIL.test(e.target.value) ? true : false,
                                },
                            }))
                        }
                    />
                    <div className={styles.InfoWrapper}>
                        <p className={state.userEmail.isValid ? styles.Right : styles.Wrong}>Invalid email address</p>
                    </div>
                </div>
                <div className={styles.InputWrapper}>
                    <input
                        className={styles.TextInput}
                        type="password"
                        id="registPassword"
                        placeholder="Enter password "
                        value={state.userPassword.password}
                        onChange={(e) =>
                            setState((prevState) => ({
                                ...prevState,
                                userPassword: {
                                    password: e.target.value,
                                    isValidRequirements: {
                                        firstRequire: e.target.value.length < 6 ? false : true,
                                        secondRequire: e.target.value === e.target.value.toLocaleLowerCase() ? false : true,
                                        thirdRequire: defaultState.REGEX_PASSWORD.test(e.target.value),
                                    },
                                },
                            }))
                        }
                    />
                    <div className={styles.InfoWrapper}>
                        <p className={state.userPassword.isValidRequirements.firstRequire ? styles.Right : styles.Wrong}>Password must be at least 6 characters long</p>
                        <p className={state.userPassword.isValidRequirements.secondRequire ? styles.Right : styles.Wrong}>The password must contain uppercase letters</p>
                        <p className={state.userPassword.isValidRequirements.thirdRequire ? styles.Right : styles.Wrong}>The password must contain at least one special character</p>
                    </div>
                </div>
                <div className={styles.InputWrapper}>
                    <input
                        className={styles.TextInput}
                        type="password"
                        id="registConfirmPassword"
                        placeholder="Confirm password "
                        value={state.userConfirmPassword.confirmPassword}
                        onChange={(e) =>
                            setState((prevState) => ({
                                ...prevState,
                                userConfirmPassword: {
                                    confirmPassword: e.target.value,
                                    isValid: true,
                                },
                            }))
                        }
                    />
                    <div className={styles.InfoWrapper}>
                        <p className={state.userConfirmPassword.isValid ? styles.Passwords : styles.Wrong}>Passwords do not match</p>
                    </div>
                </div>
                <div className={styles.ButtonWrapper}>
                    <Button
                        type="reset"
                        title="Reset data"
                        onClick={() => {
                            setState(defaultState.INITIAL_SIGN_UP_STATE);
                            resetIsExists();
                        }}
                    >
                        Clear all fields
                    </Button>
                    <Button disabled={state.userName.isValid && state.userEmail.isValid && state.userPassword.isValidRequirements.firstRequire && state.userPassword.isValidRequirements.secondRequire && state.userPassword.isValidRequirements.thirdRequire && state.userConfirmPassword.confirmPassword.length >= 6 ? false : true} type="submit" title="Submit">
                        Registration
                    </Button>
                </div>
            </form>
        </div>
    );
}
