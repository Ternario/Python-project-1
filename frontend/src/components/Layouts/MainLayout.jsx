import { Outlet } from "react-router-dom";
import Menu from "../Menu";

function MainLayout() {
    return (
        <>
            <Menu />
            <Outlet />
        </>
    );
}

export default MainLayout;
