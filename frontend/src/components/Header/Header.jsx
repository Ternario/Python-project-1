import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

import Button from "../UI/Button";

export default function Header({ isAuthorized, setSignWindow, resetAuthorizedData }) {
    return (
        <nav>
            {isAuthorized.isAuthorized && (
                <div className={styles.UserInfoContainer}>
                    <p className={styles.UserInfoName}>Hello {isAuthorized.userData.name}!</p>
                    <p className={styles.UserInfoEmail}>
                        You are logged in with "<span className={styles.UserEmail}>{isAuthorized.userData.email}</span>" email
                    </p>
                </div>
            )}
            <NavLink to="/">Home</NavLink>
            <NavLink to="/films">Search for movies</NavLink>

            {isAuthorized.isAuthorized && <NavLink to="/favorites_list">Favorites list</NavLink>}

            {!isAuthorized.isAuthorized && (
                <div>
                    <Button
                        type="button"
                        title="Sign Up"
                        onClick={() => {
                            setSignWindow((prevState) => ({
                                ...prevState,
                                signUp: true,
                            }));
                        }}
                    >
                        Sign Up
                    </Button>

                    <Button
                        type="button"
                        title="Sign In"
                        onClick={() => {
                            setSignWindow((prevState) => ({
                                ...prevState,
                                signIn: true,
                            }));
                        }}
                    >
                        Sign in
                    </Button>
                </div>
            )}

            {isAuthorized.isAuthorized && (
                <div>
                    <Button type="button" title="Log Out" onClick={resetAuthorizedData}>
                        Log Out
                    </Button>

                    <Button
                        type="button"
                        title="Delete account"
                        onClick={() => {
                            setSignWindow((prevState) => ({
                                ...prevState,
                                confirmData: true,
                            }));
                        }}
                    >
                        Delete Account
                    </Button>
                </div>
            )}
        </nav>
    );
}
