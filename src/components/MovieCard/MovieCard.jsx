import styles from "./MovieCard.module.css";
import NotFoundCard from "../../assets/NotFound/NotFoundCard.png"

export default function MovieCard(props) {
    return (
        <>
            <div className={styles.movieCard}>
                <img src={props.movie.poster_path ?  `https://image.tmdb.org/t/p/w154${props.movie.poster_path}` : NotFoundCard} alt={props.title}></img>
                <h1>{props.movie.title}</h1>
            </div>
        </>
    )
}
