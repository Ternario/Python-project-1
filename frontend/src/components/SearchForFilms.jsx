import { useState } from "react";
import styles from "./SearchForFilms.module.css";
import Form from "./Form/Form";
import { PATH } from "../service";

function SearchForFilm() {
    const [result, setResult] = useState("");
    const [requested, setRequested] = useState(false);
    const [isActor, setIsActor] = useState(false);
    const [actorName, setActorName] = useState("");

    const fetchFilmsByKeyword = async (path, query) => {
        const response = await fetch(`${PATH}${path}/${query}`);
        const data = await response.json();
        setResult(data.result);

        if (actorName) {
            setActorName("");
        }

        if (!requested) {
            setRequested(true);
        }

        if (isActor) {
            setIsActor(false);
        }
    };

    const fetchFilmsByGenreAndYear = async (path, genre, year) => {
        const response = await fetch(`${PATH}${path}/${genre}/${year}`);
        const data = await response.json();
        setResult(data.result);

        if (actorName) {
            setActorName("");
        }

        if (!requested) {
            setRequested(true);
        }

        if (isActor) {
            setIsActor(false);
        }
    };

    const fetchActors = async (path, name) => {
        const response = await fetch(`${PATH}${path}/${name}`);
        const data = await response.json();
        setResult(data.result);

        if (actorName) {
            setActorName("");
        }

        if (!requested) {
            setRequested(true);
        }

        if (!isActor) {
            setIsActor(true);
        }
    };

    const fetchFilmsByActors = async (path, name) => {
        const response = await fetch(`${PATH}${path}/${name}`);
        const data = await response.json();
        setResult(data.result);

        if (!actorName) {
            setActorName(name);
        }

        if (!requested) {
            setRequested(true);
        }

        if (isActor) {
            setIsActor(false);
        }
    };

    const fetchTopQuery = async (path) => {
        const response = await fetch(`${PATH}${path}`);
        const data = await response.json();
        setResult(data.result);

        if (actorName) {
            setActorName("");
        }

        if (!requested) {
            setRequested(true);
        }

        if (isActor) {
            setIsActor(false);
        }
    };

    const renderItems = (isActor, data) => {
        if (!isActor) {
            return data.map(({ id, title, release_year, description }) => {
                return (
                    <div key={id} className={styles.SectionFilmContainer}>
                        <div className={styles.SectionTitle}>
                            <p className={styles.Title}>Title: {title}</p>
                            {!release_year ? undefined : <p className={styles.ReleaseYear}>Release year: {release_year}</p>}
                        </div>
                        {!description ? undefined : (
                            <div className={styles.SectionDescription}>
                                <p className={styles.TitleDescription}>Description:</p>
                                <p className={styles.Description}>{description}</p>
                            </div>
                        )}
                    </div>
                );
            });
        } else {
            return data.map(({ id, first_name, last_name }) => {
                return (
                    <div key={id} className={styles.SectionActorContainer}>
                        <p className={styles.ActorName}>{first_name}</p>
                        <p className={styles.ActorName}>{last_name}</p>
                    </div>
                );
            });
        }
    };

    const info = !requested ? <h2>Let's start!</h2> : <h2>Unfortunately nothing found {"=("}</h2>;

    const items = Object.keys(result).length === 0 ? info : renderItems(isActor, result);

    const name = !actorName ? undefined : <h2>{actorName}</h2>;

    return (
        <>
            <Form setRequested={setRequested} setResult={setResult} setActorName={setActorName} fetchByKeyword={fetchFilmsByKeyword} fetchByGenreAndYear={fetchFilmsByGenreAndYear} fetchActors={fetchActors} fetchFilmsByActors={fetchFilmsByActors} fetchTopQuery={fetchTopQuery} />
            {name}
            <div>{items}</div>
        </>
    );
}

export default SearchForFilm;
