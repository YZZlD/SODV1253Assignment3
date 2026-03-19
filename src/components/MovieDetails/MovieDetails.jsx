import styles from "./MovieDetails.module.css";
import NotFoundDetails from "../../assets/NotFound/NotFoundDetails.png";
import { useNavigate } from "react-router-dom";

export default function MovieDetails({ movie, previous }) {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.exitButton} onClick={() => navigate(previous)}>X</div>
            <div className={styles.backdrop}style={{ backgroundImage: movie.backdrop_path? `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`: "none"}}>
                <div className={styles.overlay}>
                    <img className={styles.poster} src={ movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : NotFoundDetails}alt={movie.title}/>

                    <h1 className={styles.title}>{movie.title}</h1>
                    <p className={styles.tagline}>{movie.tagline}</p>

                    <div className={styles.meta}>
                        <span>⭐ {movie.vote_average} ({movie.vote_count})</span>
                        <span>{movie.release_date}</span>
                        <span>{movie.runtime} min</span>
                    </div>

                    <div className={styles.genres}>
                        {movie.genres?.map((genre) => (
                            <div key={genre.id} className={styles.genre} onClick={() => navigate(`/movies/genres/${genre.id}`)}>
                                {genre.name}
                            </div>
                        ))}
                    </div>

                    <p className={styles.overview}>{movie.overview}</p>

                    <div className={styles.meta}>
                        <span>Budget: {movie.budget == 0 ? "N/A" : `$${movie.budget.toLocaleString()}`}</span>
                        <span>Revenue: {movie.revenue == 0 ? "N/A" :`$${movie.revenue.toLocaleString()}`}</span>
                    </div>

                    {movie.homepage && (
                        <a href={movie.homepage} className={styles.link} target="_blank" rel="noopener noreferrer">Official Website</a>
                    )}
                </div>
            </div>
        </div>
    );
}
