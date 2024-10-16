import { useState } from "react";

import styles from "../AuthorizationForm.module.css";

import ConfirmDataForm from "./ConfirmDataForm/ConfirmDataForm";
import FailedRequest from "../RequestsStatuses/FailedRequest/FailedRequest";
import SuccessRequest from "../RequestsStatuses/SuccessRequest/SuccessRequest";

export default function ConfirmData({ userId, authorizationService, setSignWindow, resetAuthorizedData }) {
    const [isMatch, setIsMatch] = useState(true);
    const [isSuccess, setIsSuccess] = useState("");

    const sendDeleteRequest = async (password) => {
        const userData = {
            user_id: userId,
            password: password,
        };

        const matchResponse = await authorizationService.deleteConfirmation(userData).then((data) => {
            switch (data) {
                case 204:
                    setIsSuccess("error");
                    break;
                case 400:
                    setIsSuccess("error");
                    break;
                case 401:
                    setIsMatch(false);
                    break;
                case 500:
                    setIsSuccess("error");
                    break;
                default:
                    setIsSuccess("requested");
                    return true;
            }
        });

        if (!matchResponse) {
            setIsSuccess("");
            return;
        }

        await authorizationService.deleteUser({ user_id: userData.user_id }).then((data) => {
            switch (data) {
                case 400:
                    setIsSuccess("error");
                    break;
                case 500:
                    setIsSuccess("error");
                    break;
                default:
                    setIsSuccess("success");
                    setTimeout(() => {
                        resetAuthorizedData();
                        setSignWindow((prevState) => ({
                            ...prevState,
                            confirmData: false,
                        }));
                    }, 2000);
            }
        });
    };

    const info = (status) => {
        switch (status) {
            case "error":
                return <FailedRequest setSignWindow={setSignWindow} />;
            case "requested":
                return <SuccessRequest>Please wait</SuccessRequest>;
            case "success":
                return <SuccessRequest> Account successfully deleted </SuccessRequest>;
            default:
                return <ConfirmDataForm setSignWindow={setSignWindow} isMatch={isMatch} sendDeleteRequest={sendDeleteRequest} />;
        }
    };

    return <div className={styles.FormBackground}>{info(isSuccess)}</div>;
}
