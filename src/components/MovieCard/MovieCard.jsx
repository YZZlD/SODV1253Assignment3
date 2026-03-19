import styles from "./MovieCard.module.css";
import NotFoundCard from "../../assets/NotFound/NotFoundCard.png"
import { useLocation, useNavigate } from "react-router-dom";

export default function MovieCard(props) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            {/* When the movieCard is clicked on we navigate to the modal route while passing in background information for overlaying and from information for return routing from the modal overlay */}
            <div className={styles.movieCardContainer} onClick={() => navigate(`/movies/${props.movie.id}`, {state: {background: location, from: location}})}>
                <div className={styles.movieCardHorizontal}>
                    <img className={styles.poster} src={props.movie.poster_path ? `https://image.tmdb.org/t/p/w154${props.movie.poster_path}` : NotFoundCard} alt={props.movie.title}/>

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
