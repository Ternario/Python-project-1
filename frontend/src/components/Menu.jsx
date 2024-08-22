import { NavLink } from "react-router-dom";

const Menu = () => {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/search">Search for movies</NavLink>
        </nav>
    );
};

export default Menu;
