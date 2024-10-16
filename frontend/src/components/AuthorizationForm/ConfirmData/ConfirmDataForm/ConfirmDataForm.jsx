import { useState } from "react";

import Button from "../../../UI/Button";
import CloseButton from "../../../UI/CloseButton";

import styles from "../../AuthorizationForm.module.css";

export default function ConfirmDataForm({ setSignWindow, isMatch, sendDeleteRequest }) {
    const [text, setText] = useState("");

    const [isValid, setIsValid] = useState(true);

    const validateData = (e) => {
        e.preventDefault();

        const [authorizationPassword] = e.target;

        if (!authorizationPassword.value || authorizationPassword.value.langth < 6) {
            setIsValid(false);
            return;
        }

        sendDeleteRequest(authorizationPassword.value);
    };

    return (
        <div className={styles.FormContainer}>
            <CloseButton title="Close window" setSignWindow={setSignWindow} />
            <h2>Confirm Your Password</h2>
            <form className={styles.Form} onSubmit={(e) => validateData(e)}>
                <div className={styles.InputWrapper}>
                    <input className={styles.TextInput} id="authorizationPassword" type="password" placeholder="Enter password " value={text} onChange={(e) => setText(e.target.value)} />
                    <div className={styles.InfoWrapper}>
                        <p className={isValid ? styles.Passwords : styles.Wrong}>Password must be at least 6 characters long</p>
                        <p className={isMatch ? styles.Passwords : styles.Wrong}>Passwords do not match</p>
                    </div>
                </div>
                <div className={styles.ButtonWrapper}>
                    <Button type="submit" title="Submit">
                        Confirm
                    </Button>
                </div>
            </form>
        </div>
    );
}
