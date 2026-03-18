import styles from "./MovieCard.module.css";
import NotFoundCard from "../../assets/NotFound/NotFoundCard.png"

export default function MovieCard(props) {
    return (
        <>
                <div className={styles.movieCardContainer} onClick={() => console.log(props.movie.id)}>
                    <div className={styles.movieCardHorizontal}>
                        {/* Poster Image */}
                        <img
                        className={styles.poster}
                        src={props.movie.poster_path ? `https://image.tmdb.org/t/p/w154${props.movie.poster_path}` : NotFoundCard}
                        alt={props.movie.title}
                        />

                        {/* Movie Info */}
                        <div className={styles.movieInfo}>
                        <div className={styles.titleOverview}>
                            <h2 className={styles.title}>{props.movie.title}</h2>
                            <p className={styles.overview}>{props.movie.overview}</p>
                        </div>

                        <div className={styles.extraInfo}>
                            <span className={styles.rating}>⭐ {props.movie.vote_average} / 10 ({props.movie.vote_count} votes)</span>
                            <span className={styles.releaseDate}>Release: {props.movie.release_date}</span>
                        </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
