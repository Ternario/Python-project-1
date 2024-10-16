import { useState } from "react";

import styles from "../AuthorizationForm.module.css";

import FailedRequest from "../RequestsStatuses/FailedRequest/FailedRequest";
import SuccessRequest from "../RequestsStatuses/SuccessRequest/SuccessRequest";
import SignUpForm from "./SignUpForm/SignUpForm";

import * as defaultState from "../defaultSettings.mjs";

export default function SignUp({ setSignWindow, authorizationService, setIsAuthorized }) {
    const [isExists, setIsExists] = useState(defaultState.INITIAL_IS_EXISTS);
    const [isSuccess, setIsSuccess] = useState("");

    const resetIsExists = () => {
        setIsExists(defaultState.INITIAL_IS_EXISTS);
    };

    const registrationRequest = async (e) => {
        const [registName, registEmail, registPassword] = e.target;

        const user = {
            name: registName.value,
            email: registEmail.value,
        };

        const checkResponse = await authorizationService.checkUser(user).then((data) => {
            switch (data) {
                case 204:
                    return true;
                case 400:
                    setIsSuccess("error");
                    break;
                case 500:
                    setIsSuccess("error");
                    break;
                default:
                    setIsExists((prevState) => ({
                        ...prevState,
                        name: data.name,
                        email: data.email,
                    }));
            }
        });

        if (!checkResponse) {
            return;
        }

        const signUpData = {
            name: user.name,
            email: user.email,
            password: registPassword.value,
        };

        setIsSuccess("success");

        const createResponse = await authorizationService.signUp(signUpData).then((data) => {
            if (!data === 201) {
                return false;
            }
            return true;
        });

        if (!createResponse) {
            setIsSuccess(false);
            return;
        }

        const signInData = {
            email: signUpData.email,
            password: signUpData.password,
        };

        await authorizationService.signIn(signInData).then((userData) => {
            switch (userData) {
                case 204:
                    setIsSuccess("error");
                    break;
                case 400:
                    setIsSuccess("error");
                    break;
                case 401:
                    setIsSuccess("error");
                    break;
                case 500:
                    setIsSuccess("error");
                    break;
                default:
                    setIsAuthorized({
                        isAuthorized: true,
                        userData: {
                            name: userData.user_name,
                            id: userData.user_id,
                            email: userData.email,
                        },
                    });

                    setTimeout(() => {
                        setSignWindow((prevState) => ({
                            ...prevState,
                            signUp: false,
                        }));
                    }, 2000);
            }
        });
    };

    const info = (status) => {
        switch (status) {
            case "error":
                return <FailedRequest setSignWindow={setSignWindow} />;
            case "success":
                return <SuccessRequest> Registration was successful! </SuccessRequest>;
            default:
                return <SignUpForm isExists={isExists} resetIsExists={resetIsExists} registrationRequest={registrationRequest} setSignWindow={setSignWindow} />;
        }
    };

    return <div className={styles.FormBackground}>{info(isSuccess)}</div>;
}
