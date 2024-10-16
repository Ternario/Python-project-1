import styles from "../Main.module.css";
export default function Queries({ data }) {
    return data.map(({ id, title, count }) => {
        return (
            <div key={id} className={styles.SectionActorContainer}>
                <p className={styles.ActorName}>
                    Query: "{title}", Count: {count}
                </p>
            </div>
        );
    });
}
