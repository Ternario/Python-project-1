import Button from "../../UI/Button";
import styles from "./Films.module.css";

export default function FilmsList({ isAuthorized, addToFavorite, deleteFromFavorite, data, resetResult }) {
    return data.map(({ id, title, release_year, description, isFavorit }) => {
        return (
            <div key={id} className={styles.SectionFilmContainer}>
                <div className={styles.FilmCOntainer}>
                    <div className={styles.SectionTitle}>
                        <p className={styles.Title}>Title: {title}</p>
                        <p className={styles.ReleaseYear}>Release year: {release_year}</p>
                    </div>

                    <div className={styles.SectionDescription}>
                        <p className={styles.TitleDescription}>Description:</p>
                        <p className={styles.Description}>{description}</p>
                    </div>
                </div>
                {isAuthorized && (
                    <div className={styles.ButtonContainer}>
                        {!isFavorit ? (
                            <Button type="button" title="Add to favorites" className={styles.AddToFavorites} onClick={() => addToFavorite(id)}>
                                Add to favorites
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                title="Delete from favorites"
                                className={styles.AddToFavorites}
                                onClick={async () => {
                                    deleteFromFavorite(id);

                                    if (resetResult) {
                                        resetResult(id);
                                    }
                                }}
                            >
                                Delete from favorites
                            </Button>
                        )}
                    </div>
                )}
            </div>
        );
    });
}
