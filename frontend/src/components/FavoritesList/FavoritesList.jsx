import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./FavoritesList.module.css";

import FilmsList from "../ReusableComponents/FilmsList/FilmsList";
import Button from "../UI/Button";

export default function FavoritesList({ isAuthorized, favoritesList, userId, favoritesListService, deleteFromFavorite, deleteAllFromFavorites }) {
    const [result, setResult] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthorized) {
            navigate("/films");
            return;
        }

        async function fetchData() {
            await favoritesListService.getFavoritesFilms({ user_id: userId, films_list: favoritesList }).then((data) => {
                setResult(() => {
                    if (data.status === 500) {
                        return false;
                    } else if (data === 204) {
                        return [];
                    } else {
                        return data.map((items) => {
                            return {
                                ...items,
                                isFavorit: true,
                            };
                        });
                    }
                });
            });
        }
        fetchData();
    }, [isAuthorized]);

    useEffect(() => {
        if (favoritesList.length === 0) {
            setResult([]);
        }
    }, [favoritesList]);

    const resetResult = (id) => {
        setResult(result.filter((item) => item.id !== id));
    };

    const setRequestion = (data) => {
        if (!data) {
            alert("somthing went wrong, please try later");
            return <h2>An error occurred, please try later</h2>;
        } else if (data.length === 0) {
            return <h2>Your list is empty</h2>;
        } else {
            return <FilmsList isAuthorized={true} data={data} deleteFromFavorite={deleteFromFavorite} resetResult={resetResult} />;
        }
    };

    return (
        <div className={styles.ResultContainer}>
            {result.length === 0 ? null : <Button onClick={() => deleteAllFromFavorites()}>Delete entire list</Button>}
            {setRequestion(result)}
        </div>
    );
}
