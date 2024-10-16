import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

function MainLayout({ isAuthorized, setSignWindow, resetAuthorizedData }) {
    return (
        <>
            <Header isAuthorized={isAuthorized} setSignWindow={setSignWindow} resetAuthorizedData={resetAuthorizedData} />
            <Outlet />
        </>
    );
}

export default MainLayout;
