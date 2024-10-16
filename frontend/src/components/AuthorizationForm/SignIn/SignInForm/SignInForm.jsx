import { useState } from "react";

import styles from "../../AuthorizationForm.module.css";
import Button from "../../../UI/Button";
import CloseButton from "../../../UI/CloseButton";

import * as defaultState from "../../defaultSettings.mjs";

export default function SignInForm({ isExistsUser, isValidData, authorizationRequest, setSignWindow }) {
    const [state, setState] = useState(defaultState.INITIAL_SIGN_IN_STATE);

    const validateData = (e) => {
        e.preventDefault();

        if (!state.userEmail || !state.userPassword) {
            setState((prevState) => ({
                ...prevState,
                isFill: false,
            }));

            return;
        }

        authorizationRequest(e);
    };

    return (
        <div className={styles.FormContainer}>
            <CloseButton title="Close window" setSignWindow={setSignWindow} />
            <h2>AUTHORIZATION</h2>
            <form className={styles.Form} onSubmit={(e) => validateData(e)}>
                {!isExistsUser ? (
                    <div className={styles.InfoWrapper}>
                        <p className={styles.Wrong}>User with this email not found</p>
                    </div>
                ) : null}
                {!isValidData ? (
                    <div className={styles.InfoWrapper}>
                        <p className={styles.Wrong}>Invalid email or password</p>
                    </div>
                ) : null}
                {!state.isFill ? (
                    <div className={styles.InfoWrapper}>
                        <p className={styles.Wrong}>Fill in the fields</p>
                    </div>
                ) : null}
                <div className={styles.InputWrapper}>
                    <input
                        className={styles.TextInput}
                        id="authorizationEmail"
                        type="text"
                        placeholder="Enter email "
                        value={state.userEmail}
                        onChange={(e) =>
                            setState((prevState) => ({
                                ...prevState,
                                userEmail: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className={styles.InputWrapper}>
                    <input
                        className={styles.TextInput}
                        id="authorizationPassword"
                        type="password"
                        placeholder="Enter password "
                        value={state.userPassword}
                        onChange={(e) =>
                            setState((prevState) => ({
                                ...prevState,
                                userPassword: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className={styles.ButtonWrapper}>
                    <Button
                        type="reset"
                        title="Reset data"
                        onClick={() => {
                            setState(defaultState.INITIAL_SIGN_IN_STATE);
                        }}
                    >
                        Clear all fields
                    </Button>
                    <Button type="submit" title="Submit">
                        Log in
                    </Button>
                </div>
            </form>
        </div>
    );
}
