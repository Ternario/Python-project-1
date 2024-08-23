import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import Button from "../UI/Button";
import { PATH } from "../../service";

function Form({ isRun, fetchRunApp, setRequested, setResult, setActorName, fetchByKeyword, fetchByGenreAndYear, fetchActors, fetchFilmsByActors, fetchTopQuery, closeConnection }) {
    const currentYear = new Date().getFullYear();
    const minYear = 1950;
    const letters = /^[A-Za-z]+$/;

    const [text, setText] = useState("");
    const [radio, setRadio] = useState("byKeyWord");
    const [genresList, setGenresList] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [year, setYear] = useState("");

    const onSubmitHandler = (event) => {
        event.preventDefault();

        switch (radio) {
            case "byKeyWord":
                if (!text || !text.match(letters)) {
                    alert("Write a query or the query contains non-literal values");
                    return;
                }

                fetchByKeyword(radio, text);
                setText("");
                break;

            case "byGenreAndYear":
                if (!selectedGenre || !year) {
                    alert("Genre or year is not selected");
                    return;
                }

                fetchByGenreAndYear(radio, selectedGenre, year);
                break;

            case "actors":
                if (!text || !text.match(letters)) {
                    alert("Write a name of Actor or the name contains non-literal values");
                    return;
                }

                fetchActors(radio, text);
                setText("");
                break;

            case "filmActor":
                if (!text || !text.match(letters)) {
                    alert("Write a name of Actor or the name contains non-literal values");
                    return;
                }

                fetchFilmsByActors(radio, text);
                setText("");
                break;

            case "topTenQuery":
                fetchTopQuery(radio);
                break;
            default:
                console.log(`Sorry, we are out of ${radio}.`);
        }
    };

    const getGenresList = async () => {
        if (!isRun) {
            alert("Connection is closed, you have to open it again");
            return;
        }

        const response = await fetch(`${PATH}genres`);
        const data = await response.json();
        setGenresList(data);
    };

    useEffect(() => {
        if (radio === "byGenreAndYear" && isRun && !genresList) {
            getGenresList();
        }
    }, [radio, isRun]);

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
            <div className={styles.GenresContainer}>
                <div className={styles.SelectContainer}>
                    <label className={styles.SelectLabel} htmlFor="genre-select">
                        Choose a genre:
                    </label>
                    <select
                        className={styles.Select}
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
                <div className={styles.SelectContainer}>
                    <label className={styles.SelectLabel} htmlFor="year-select">
                        Choose a year:
                    </label>
                    <select
                        className={styles.Select}
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
        <div className={styles.FormContainer}>
            {!isRun ? (
                <button className={styles.ConnectionButton} onClick={() => fetchRunApp()}>
                    Click to make a connection.
                </button>
            ) : (
                <button className={styles.ConnectionButton} onClick={() => closeConnection()}>
                    Please click here after using to close connection with db.
                </button>
            )}
            <form onSubmit={onSubmitHandler}>
                <div>
                    <h2>Search by:</h2>
                    <div className={styles.RadioContainer}>
                        <div className={styles.Radio}>
                            <label className={styles.RadioLabel}>
                                <input
                                    id="byKeyWord"
                                    type="radio"
                                    value="byKeyWord"
                                    checked={radio === "byKeyWord"}
                                    onChange={(e) => {
                                        setRadio(e.target.value);
                                        setRequested(false);
                                        setText("");
                                        setResult("");
                                        setActorName("");
                                    }}
                                />
                                By keyword
                            </label>
                        </div>
                        <div className={styles.Radio}>
                            <label className={styles.RadioLabel}>
                                <input
                                    id="byGenreAndYear"
                                    type="radio"
                                    value="byGenreAndYear"
                                    checked={radio === "byGenreAndYear"}
                                    onChange={(e) => {
                                        setRadio(e.target.value);
                                        setRequested(false);
                                        setText("");
                                        setResult("");
                                        setActorName("");
                                    }}
                                />
                                By genre and year
                            </label>
                        </div>
                        <div className={styles.Radio}>
                            <label className={styles.RadioLabel}>
                                <input
                                    id="actors"
                                    type="radio"
                                    value="actors"
                                    checked={radio === "actors"}
                                    onChange={(e) => {
                                        setRadio(e.target.value);
                                        setRequested(false);
                                        setText("");
                                        setResult("");
                                        setActorName("");
                                    }}
                                />
                                Actors
                            </label>
                        </div>
                        <div className={styles.Radio}>
                            <label className={styles.RadioLabel}>
                                <input
                                    id="filmActor"
                                    type="radio"
                                    value="filmActor"
                                    checked={radio === "filmActor"}
                                    onChange={(e) => {
                                        setRadio(e.target.value);
                                        setRequested(false);
                                        setText("");
                                        setResult("");
                                    }}
                                />
                                Films by actor
                            </label>
                        </div>
                        <div className={styles.Radio}>
                            <label className={styles.RadioLabel}>
                                <input
                                    id="topTenQuery"
                                    type="radio"
                                    value="topTenQuery"
                                    checked={radio === "topTenQuery"}
                                    onChange={(e) => {
                                        setRadio(e.target.value);
                                        setRequested(false);
                                        setText("");
                                        setResult("");
                                        setActorName("");
                                    }}
                                />
                                Top 10 query
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    {genres}
                    {radio !== "byGenreAndYear" && radio !== "topTenQuery" ? <input className={styles.TextInput} id="query" placeholder="Enter " value={text} onChange={(e) => setText(e.target.value)} /> : <></>}
                    <Button type="submit" title="Submit">
                        Search
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Form;
