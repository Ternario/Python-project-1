import { useState, useEffect } from "react";

import styles from "../Main.module.css";
import Button from "../../UI/Button";
import Movies from "../../../services/movies.mjs";
import Actors from "../../../services/actors.mjs";
import SearchQueries from "../../../services/searchQueries.mjs";
import { currentYear, minYear, letters } from "./searchMoviesFormDefaultSettings.mjs";

export default function SearchMoviesForm({ setRequested, setSelectedSearchType, setResult, compareListWithFavorites }) {
    const movies = new Movies();
    const actors = new Actors();
    const searchQueries = new SearchQueries();

    const [text, setText] = useState("");
    const [radio, setRadio] = useState("byKeyWord");
    const [genresList, setGenresList] = useState("");
    const [selectedValue, setSelectedValue] = useState({ genre: "", year: "" });
    const [isCorretcValues, setIsCorrectValues] = useState({ text: true, checkboxes: true });

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        switch (radio) {
            case "byKeyWord":
                if (!text || !text.match(letters)) {
                    setIsCorrectValues((prevState) => ({
                        ...prevState,
                        text: false,
                    }));

                    setResult(false);
                    return;
                }

                setRequested("requested");

                await movies.getMoviesByKeyword(text).then((result) => {
                    setSelectedSearchType({ type: radio, searchQuery: text });
                    compareListWithFavorites(result);
                });

                setText("");

                if (!isCorretcValues.text) {
                    setIsCorrectValues((prevState) => ({
                        ...prevState,
                        text: true,
                    }));
                }
                break;
            case "byGenreAndYear":
                if (!selectedValue.genre || !selectedValue.year) {
                    setIsCorrectValues((prevState) => ({
                        ...prevState,
                        checkboxes: false,
                    }));
                    return;
                }

                setRequested("requested");

                await movies.getMoviesByGenreAndYear(selectedValue).then((result) => {
                    setSelectedSearchType({ type: radio, searchQuery: `Genre: ${selectedValue.genre}, Year: ${selectedValue.year}` });
                    compareListWithFavorites(result);
                });

                if (!isCorretcValues.checboxes) {
                    setIsCorrectValues((prevState) => ({
                        ...prevState,
                        checkboxes: true,
                    }));
                }
                break;
            case "actors":
                if (!text || !text.match(letters)) {
                    setIsCorrectValues((prevState) => ({
                        ...prevState,
                        text: false,
                    }));
                    return;
                }

                setRequested("requested");

                await actors.getActors(text).then((result) => {
                    compareListWithFavorites(result);
                    setSelectedSearchType({ type: radio, searchQuery: text });
                });

                setText("");

                if (!isCorretcValues.text) {
                    setIsCorrectValues((prevState) => ({
                        ...prevState,
                        text: true,
                    }));
                }
                break;
            case "filmActor":
                if (!text || !text.match(letters)) {
                    setIsCorrectValues((prevState) => ({
                        ...prevState,
                        text: false,
                    }));
                    return;
                }

                setRequested("requested");

                await movies.getMoviesByActorsName(text).then((result) => {
                    setSelectedSearchType({ type: radio, searchQuery: text });
                    compareListWithFavorites(result);
                });
                setText("");

                if (!isCorretcValues.text) {
                    setIsCorrectValues((prevState) => ({
                        ...prevState,
                        text: true,
                    }));
                }
                break;
            case "topTenQuery":
                await searchQueries.getSearchHistory().then((result) => {
                    setSelectedSearchType({ type: radio, searchQuery: "Top ten query" });
                    compareListWithFavorites(result);
                });
                break;
            default:
                console.log(`Sorry, we are out of ${radio}.`);
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (radio === "byGenreAndYear" && !genresList) {
                await movies.getGenres().then((genres) => {
                    if (genres) {
                        setGenresList(genres);
                    } else {
                        setGenresList("");
                        alert("Somthing went wrong with 'Genres', please try later");
                    }
                });
            }
        }

        fetchData();
    }, [radio, genresList]);

    const renderGenresList = (data) => {
        if (data.length === 0) {
            return;
        }

        return data.map(({ id, title }) => {
            return (
                <option key={id} value={title}>
                    {title}
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

    const select_genres = genresList ? renderGenresList(genresList) : null;
    const genres = radio === "byGenreAndYear" && (
        <div className={styles.GenresContainer}>
            <div className={styles.SelectContainer}>
                <label className={styles.SelectLabel} htmlFor="genre-select">
                    Choose a genre:
                </label>
                <select
                    className={styles.Select}
                    name="genres"
                    id="genre-select"
                    value={selectedValue.genre}
                    onChange={(e) => {
                        setSelectedValue((prevState) => ({
                            ...prevState,
                            genre: e.target.value,
                        }));
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
                    value={selectedValue.year}
                    onChange={(e) => {
                        setSelectedValue((prevState) => ({
                            ...prevState,
                            year: e.target.value,
                        }));
                    }}
                >
                    <option value="">--Please choose a year--</option>
                    {renderYears()}
                </select>
            </div>
        </div>
    );

    return (
        <div className={styles.FormContainer}>
            <form onSubmit={onSubmitHandler}>
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
                                    setSelectedSearchType({ type: "", searchQuery: "" });
                                    setSelectedValue({ genre: "", year: "" });
                                    setIsCorrectValues({ text: true, checkboxes: true });
                                    setResult(false);
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
                                    setSelectedSearchType({ type: "", searchQuery: "" });
                                    setIsCorrectValues({ text: true, checkboxes: true });
                                    setResult(false);
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
                                    setSelectedSearchType({ type: "", searchQuery: "" });
                                    setSelectedValue({ genre: "", year: "" });
                                    setIsCorrectValues({ text: true, checkboxes: true });
                                    setResult(false);
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
                                    setSelectedSearchType({ type: "", searchQuery: "" });
                                    setSelectedValue({ genre: "", year: "" });
                                    setIsCorrectValues({ text: true, checkboxes: true });
                                    setResult(false);
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
                                    setSelectedSearchType({ type: "", searchQuery: "" });
                                    setSelectedValue({ genre: "", year: "" });
                                    setIsCorrectValues({ text: true, checkboxes: true });
                                    setResult(false);
                                }}
                            />
                            Top 10 query
                        </label>
                    </div>
                </div>
                <div>
                    {genres}
                    {radio !== "byGenreAndYear" && radio !== "topTenQuery" ? <input className={styles.TextInput} id="query" placeholder="Enter " value={text} onChange={(e) => setText(e.target.value)} /> : null}
                    <Button type="submit" title="Search">
                        Search
                    </Button>
                    {!isCorretcValues.checkboxes && <p className={styles.Info}>You have to choose genre and yer</p>}

                    {!isCorretcValues.text && <p className={styles.Info}>Write a query or the query contains non-literal values</p>}
                </div>
            </form>
        </div>
    );
}
