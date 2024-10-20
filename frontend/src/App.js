import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";

import Home from "./components/Home";
import MainLayout from "./components/Layouts/MainLayout";
import AuthorizationForm from "./components/AuthorizationForm/AuthorizationForm";
import Main from "./components/Main/Main";
import FavoritesList from "./components/FavoritesList/FavoritesList";
import NotFound from "./components/NotFound";

import isAuthorizedInititalData from "./authorizationDefaultSettings.mjs";

import FavoritesListService from "./services/favoritesList.mjs";

export default function App() {
    const favoritesListService = new FavoritesListService();

    const [favoritesList, setFavoritesList] = useState([]);

    const [signWindow, setSignWindow] = useState({ signUp: false, signIn: false, confirmData: false });

    const [isAuthorized, setIsAuthorized] = useState(isAuthorizedInititalData);

    const addToFavorite = async (id) => {
        await favoritesListService.addToFavorites({ user_id: isAuthorized.userData.id, film_id: id }).then((status) => {
            if (status === 201) {
                setFavoritesList([...favoritesList, id]);
            } else {
                alert("Somthin went wrong, please try later");
            }
        });
    };
    const deleteFromFavorite = async (id) => {
        await favoritesListService.deleteFromFavorites({ user_id: isAuthorized.userData.id, film_id: id }).then((status) => {
            if (status) {
                setFavoritesList(favoritesList.filter((item) => item !== id));
            } else {
                alert("Somthin went wrong, please try later");
            }
        });
    };

    const deleteAllFromFavorites = async () => {
        await favoritesListService.deleteEntireList({ user_id: isAuthorized.userData.id }).then((status) => {
            if (status) {
                setFavoritesList([]);
            } else {
                alert("Somthin went wrong, please try later");
            }
        });
    };

    useEffect(() => {
        async function fetchData() {
            if (!isAuthorized.isAuthorized) {
                return;
            }

            await favoritesListService.getFavoritesList({ user_id: isAuthorized.userData.id }).then((items) => setFavoritesList(items));
        }

        fetchData();
    }, [isAuthorized.isAuthorized]);

    const resetAuthorizedData = () => {
        setIsAuthorized(isAuthorizedInititalData);
    };

    return (
        <BrowserRouter>
            <div className="App">
                <AuthorizationForm userId={isAuthorized.userData.id} signWindow={signWindow} setSignWindow={setSignWindow} setIsAuthorized={setIsAuthorized} resetAuthorizedData={resetAuthorizedData} />

                <Routes>
                    <Route path="/" element={<MainLayout isAuthorized={isAuthorized} setSignWindow={setSignWindow} resetAuthorizedData={resetAuthorizedData} />}>
                        <Route index element={<Home />} />

                        <Route path="/films" element={<Main isAuthorized={isAuthorized.isAuthorized} favoritesList={favoritesList} addToFavorite={addToFavorite} deleteFromFavorite={deleteFromFavorite} />} />

                        <Route path="/favorites_list" element={<FavoritesList isAuthorized={isAuthorized.isAuthorized} favoritesList={favoritesList} userId={isAuthorized.userData.id} favoritesListService={favoritesListService} deleteFromFavorite={deleteFromFavorite} deleteAllFromFavorites={deleteAllFromFavorites} />} />

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
