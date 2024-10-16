import { useEffect, useState } from "react";

import FadeLoader from "react-spinners/FadeLoader";

import styles from "./Main.module.css";
import SearchMoviesForm from "./SearchMoviesForm/SearchMoviesForm";
import Actors from "./Actors/Actors";
import Queries from "./Queries/Queries";
import FilmsList from "../ReusableComponents/FilmsList/FilmsList";

export default function Main({ isAuthorized, favoritesList, addToFavorite, deleteFromFavorite }) {
    const [result, setResult] = useState(false);
    const [requested, setRequested] = useState(false);
    const [selectedSearchType, setSelectedSearchType] = useState({ type: "", searchQuery: "" });

    useEffect(() => {
        if (!result) {
            return;
        }

        compareListWithFavorites(result);
    }, [favoritesList]);

    const compareListWithFavorites = (data) => {
        setRequested("result");
        console.log(data);

        if (data === 500 || data === 400 || data === 404) {
            setRequested("error");
            return;
        }

        if (!data || data.length === 0) {
            setResult([]);
            return;
        }

        switch (isAuthorized) {
            case false:
                setResult(data);
                break;
            default:
                switch (selectedSearchType.type) {
                    case "actors":
                        setResult(data);
                        break;
                    default:
                        setResult(() => {
                            if (favoritesList.length === 0) {
                                return data.map((items) => {
                                    return { ...items, isFavorit: false };
                                });
                            }
                            return data.map((items) => {
                                const checkIsFavorit = favoritesList.filter((item) => item === items.id);

                                if (checkIsFavorit.length !== 0) {
                                    return {
                                        ...items,
                                        isFavorit: true,
                                    };
                                }

                                return {
                                    ...items,
                                    isFavorit: false,
                                };
                            });
                        });
                }
        }
    };

    const renderItems = (type, data) => {
        switch (type) {
            case "actors":
                return <Actors data={data} />;

            case "topTenQuery":
                return <Queries data={data} />;

            default:
                return <FilmsList isAuthorized={isAuthorized} addToFavorite={addToFavorite} deleteFromFavorite={deleteFromFavorite} data={data} />;
        }
    };

    const setRequestion = (request, type, data) => {
        switch (request) {
            case "requested":
                return (
                    <div className={styles.AwaitSpinner}>
                        <FadeLoader color="white" height={25} />
                    </div>
                );
            case "result":
                if (!data) {
                    return;
                } else if (data.length === 0) {
                    return <h2>Unfortunately nothing found {"=("}</h2>;
                }
                return renderItems(type.type, data);
            case "error":
                alert("somthing went wrong, please try later");
                return <h2>An error occurred, please try later</h2>;

            default:
                return <h2>Let's start!</h2>;
        }
    };

    return (
        <>
            <SearchMoviesForm setRequested={setRequested} compareListWithFavorites={compareListWithFavorites} setSelectedSearchType={setSelectedSearchType} setResult={setResult} />
            {selectedSearchType.searchQuery && <h2>Search results for "{selectedSearchType.searchQuery}":</h2>}
            <div className={styles.ResultContainer}>{setRequestion(requested, selectedSearchType, result)}</div>
        </>
    );
}
