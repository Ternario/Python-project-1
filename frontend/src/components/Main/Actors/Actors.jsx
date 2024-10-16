import styles from "../Main.module.css";
export default function Actors({ data }) {
    return data.map(({ id, first_name, last_name }) => {
        return (
            <div key={id} className={styles.SectionActorContainer}>
                <p className={styles.ActorName}>
                    {first_name} {last_name}
                </p>
            </div>
        );
    });
}
