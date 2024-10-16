import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";

import styles from "./Button.module.css";

export default function CloseButton({ setSignWindow }) {
    return (
        <IconContext.Provider value={{ size: "2em" }}>
            <button title="Close window" className={styles.CloseIconWrapper} onClick={() => setSignWindow({ signUp: false, signIn: false, confirmData: false })}>
                <IoClose />
            </button>
        </IconContext.Provider>
    );
}
