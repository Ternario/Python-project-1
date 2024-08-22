import { useState } from "react";
import Form from "./Form/Form";

function SearchForFilm() {
    const [result, setResult] = useState("");

    const fetchFilmsByKeyword = async (path, query) => {
        const response = await fetch(`http://127.0.0.1:5000/${path}/${query}`);
        const data = await response.json();
        setResult(data.result);
    };

    const fetchFilmsByGenreAndYear = async (path, genre, year) => {
        const response = await fetch(`http://127.0.0.1:5000/${path}/${genre}/${year}`);
        const data = await response.json();
        setResult(data.result);
    };

    const fetchTopQuery = async (path) => {
        const response = await fetch(`http://127.0.0.1:5000/${path}`);
        const data = await response.json();
        setResult(data.result);
    };

    const renderItems = (data) => {
        return data.map(({ id, title, release_year, description }) => {
            return (
                <div key={id} className="section">
                    <div className="section-title">
                        <div className="section-title__name">{title}</div>
                        <div className="section-title__date">{release_year}</div>
                    </div>
                    <div className="section-description">
                        <p>{description}</p>
                    </div>
                </div>
            );
        });
    };

    const items = !result ? <h2>Let's start!</h2> : renderItems(result);

    return (
        <>
            <h1>Search</h1>
            <Form fetchByKeyword={fetchFilmsByKeyword} fetchByGenreAndYear={fetchFilmsByGenreAndYear} fetchTopQuery={fetchTopQuery} />
            <div>{items}</div>
        </>
    );
}

export default SearchForFilm;
