import { NavLink } from "react-router-dom";

const Menu = () => {
    const fetchFilmsByKeyword = async () => {
        const response = await fetch(`http://127.0.0.1:5000/signUp/`);
        const data = await response.json();
        console.log(data);
    };
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/search">Search for movies</NavLink>
            <button
                onClick={() => {
                    fetchFilmsByKeyword();
                }}
            >
                Sign Up
            </button>
        </nav>
    );
};

export default Menu;
