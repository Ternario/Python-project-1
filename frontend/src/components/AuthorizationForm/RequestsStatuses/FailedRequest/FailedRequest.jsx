import styles from "../../AuthorizationForm.module.css";
import CloseButton from "../../../UI/CloseButton";

export default function FailedRequest({ setSignWindow }) {
    return (
        <div className={styles.InfoContainer}>
            <CloseButton setSignWindow={setSignWindow} />
            <span className={styles.RequestInfoFaild}>Something went wrong, please try again later</span>
        </div>
    );
}
