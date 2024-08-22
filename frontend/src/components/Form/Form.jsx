import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import Button from "../UI/Button";

function Form({ fetchByKeyword, fetchByGenreAndYear, fetchTopQuery }) {
    const currentYear = new Date().getFullYear();
    const minYear = 1950;

    const [text, setText] = useState("");
    const [radio, setRadio] = useState("byKeyWord");
    const [genresList, setGenresList] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [year, setYear] = useState("");

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (radio === "byKeyWord") {
            fetchByKeyword(radio, text);
            setText("");
        } else if (radio === "byGenreAndYear") {
            fetchByGenreAndYear(radio, selectedGenre, year);
        } else if (radio === "topTenQuery") {
            fetchTopQuery(radio);
        }
    };

    const getGenresList = async () => {
        const response = await fetch(`http://127.0.0.1:5000/genres`);
        const data = await response.json();
        setGenresList(data);
    };

    useEffect(() => {
        if (radio === "byGenreAndYear") {
            getGenresList();
        }
    }, [radio]);

    const renderGenresList = (date) => {
        return date.result.map((genre) => {
            return (
                <option key={genre} value={genre}>
                    {genre}
                </option>
            );
        });
    };

    const renderYears = () => {
        const count = currentYear - minYear + 1;

        return new Array(count).fill(undefined).map((_, key) => (
            <option key={key} value={minYear + key}>
                {minYear + key}
            </option>
        ));
    };

    const select_genres = genresList ? renderGenresList(genresList) : NaN;
    const genres =
        radio === "byGenreAndYear" ? (
            <div>
                <div>
                    <label htmlFor="genre-select">Choose a genre:</label>
                    <select
                        name="genres"
                        id="genre-select"
                        value={selectedGenre}
                        onChange={(e) => {
                            setSelectedGenre(e.target.value);
                        }}
                    >
                        <option value="">--Please choose a genre--</option>
                        {select_genres}
                    </select>
                </div>
                <div>
                    <label htmlFor="year-select">Choose a year:</label>
                    <select
                        name="years"
                        id="year-select"
                        value={year}
                        onChange={(e) => {
                            setYear(e.target.value);
                        }}
                    >
                        <option value="">--Please choose a year--</option>
                        {renderYears()}
                    </select>
                </div>
            </div>
        ) : (
            <></>
        );

    return (
        <div className={styles.todoFormContainer}>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <h2>Search by:</h2>
                    <div>
                        <div className="radio">
                            <label>
                                <input
                                    id="byKeyWord"
                                    type="radio"
                                    value="byKeyWord"
                                    checked={radio === "byKeyWord"}
                                    onChange={(e) => {
                                        setRadio(e.target.value);
                                    }}
                                />
                                By keyword
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    id="byGenreAndYear"
                                    type="radio"
                                    value="byGenreAndYear"
                                    checked={radio === "byGenreAndYear"}
                                    onChange={(e) => {
                                        setRadio(e.target.value);
                                    }}
                                />
                                By genre and year
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    id="topTenQuery"
                                    type="radio"
                                    value="topTenQuery"
                                    checked={radio === "topTenQuery"}
                                    onChange={(e) => {
                                        setRadio(e.target.value);
                                    }}
                                />
                                Top 10 query
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    {genres}
                    {radio !== "byGenreAndYear" && radio !== "topTenQuery" ? <input id="query" placeholder="Enter " value={text} onChange={(e) => setText(e.target.value)} /> : <></>}
                    <Button type="submit" title="Submit">
                        Search
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Form;
