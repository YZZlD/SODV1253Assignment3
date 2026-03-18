import styles from "./MovieCard.module.css";

export default function MovieCard(props) {
    return (
        <>
            <div className={styles.movieCard}>
                <img src={`https://image.tmdb.org/t/p/w154${props.movie.poster_path}`} alt={props.title}></img>
                <h1>{props.movie.title}</h1>
            </div>
        </>
    )
}
