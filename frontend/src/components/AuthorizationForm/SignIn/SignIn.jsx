import { useState } from "react";

import styles from "../AuthorizationForm.module.css";

import FailedRequest from "../RequestsStatuses/FailedRequest/FailedRequest";
import SuccessRequest from "../RequestsStatuses/SuccessRequest/SuccessRequest";
import SignInForm from "./SignInForm/SignInForm";

export default function SignIn({ setSignWindow, authorizationService, setIsAuthorized }) {
    const [isValidData, setIsValidData] = useState(true);
    const [isExistsUser, setIsExistsUser] = useState(true);
    const [isSuccess, setIsSuccess] = useState("");

    const authorizationRequest = async (e) => {
        const [authorizationEmail, authorizationPassword] = e.target;

        const data = {
            email: authorizationEmail.value,
            password: authorizationPassword.value,
        };

        await authorizationService.signIn(data).then((userData) => {
            switch (userData) {
                case 204:
                    setIsValidData(true);
                    setIsExistsUser(false);
                    break;
                case 400:
                    setIsSuccess("error");
                    break;
                case 401:
                    setIsExistsUser(true);
                    setIsValidData(false);
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

                    setIsSuccess("success");
                    setTimeout(() => {
                        setSignWindow({ signUp: false, signIn: false });
                    }, 2000);
            }
        });
    };

    const info = (status) => {
        switch (status) {
            case "error":
                return <FailedRequest setSignWindow={setSignWindow} />;
            case "success":
                return <SuccessRequest> Authorization successful! </SuccessRequest>;
            default:
                return <SignInForm isExistsUser={isExistsUser} isValidData={isValidData} authorizationRequest={authorizationRequest} setSignWindow={setSignWindow} />;
        }
    };

    return <div className={styles.FormBackground}>{info(isSuccess)}</div>;
}
