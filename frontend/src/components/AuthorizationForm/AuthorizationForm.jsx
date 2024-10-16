import SignUpForm from "./SignUp/SignUp";
import SIgnInForm from "./SignIn/SignIn";
import ConfirmData from "./ConfirmData/ConfirmData";
import AuthorizationService from "../../services/authorizationService.mjs";

export default function AuthorizationForm({ signWindow, setSignWindow, setIsAuthorized, userId, resetAuthorizedData }) {
    const authorizationService = new AuthorizationService();

    return (
        <>
            {signWindow.signUp && <SignUpForm setSignWindow={setSignWindow} authorizationService={authorizationService} setIsAuthorized={setIsAuthorized} />}
            {signWindow.signIn && <SIgnInForm setSignWindow={setSignWindow} authorizationService={authorizationService} setIsAuthorized={setIsAuthorized} />}
            {signWindow.confirmData && <ConfirmData userId={userId} setSignWindow={setSignWindow} authorizationService={authorizationService} setIsAuthorized={setIsAuthorized} resetAuthorizedData={resetAuthorizedData} />}
        </>
    );
}
