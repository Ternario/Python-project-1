import { NavLink } from "react-router-dom";

const Menu = () => {
    const fetchFilmsByKeyword = async () => {
        const data = {
            email: "www@gil.com",
            // user_name: "wwwGujil",
            password: "hjdgasdafgh",
        };

        const url = "http://127.0.0.1:5000/signUp";
        const options = {
            method: "POST",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        console.log(options);
        const response = await fetch(url, options);

        console.log(response.status);

        const result = await response.json();
        console.log(result);
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
