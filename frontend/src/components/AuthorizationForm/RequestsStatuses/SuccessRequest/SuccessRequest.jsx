import FadeLoader from "react-spinners/FadeLoader";
import styles from "../../AuthorizationForm.module.css";

export default function SuccessRequest(props) {
    const { children } = props;
    return (
        <div className={styles.InfoContainer}>
            <span className={styles.RequestInfoSuccess}>{children}</span>
            <div className={styles.Spinner}>
                <FadeLoader color="white" height={25} />
            </div>
        </div>
    );
}
