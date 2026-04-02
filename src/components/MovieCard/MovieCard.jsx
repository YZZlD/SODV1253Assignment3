import styles from "./MovieCard.module.css";
import NotFoundCard from "../../assets/NotFound/NotFoundCard.png"
import { useLocation, useNavigate } from "react-router-dom";
import React, { useCallback } from "react";

function MovieCard(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = useCallback(() => {
        navigate(`/movies/${props.movie.id}`, { state: { background: location, from: location } });
    }, [navigate, props.movie.id, location]);

    return (
        <>
            {/* When the movieCard is clicked on we navigate to the modal route while passing in background information for overlaying and from information for return routing from the modal overlay */}
            <div className={styles.movieCardContainer} onClick={handleClick}>
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

//Check that all of the fields are equal to the new reference objects fields. This comparison is necessary
//as shallowly checking object references will result in rerendering vs checking equality of all fields will not.
//This means even though a new movie object is created if it has identical fields it will not rerender.
export default React.memo(MovieCard, (prevProps, nextProps) => {
    const prev = prevProps.movie;
    const next = nextProps.movie;

    return prev.id === next.id &&
           prev.poster_path === next.poster_path &&
           prev.title === next.title &&
           prev.overview === next.overview &&
           prev.vote_average === next.vote_average &&
           prev.vote_count === next.vote_count &&
           prev.release_date === next.release_date;
})
