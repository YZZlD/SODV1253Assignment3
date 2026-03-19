import { useEffect, useState} from "react";
import { createPortal } from "react-dom";
import MovieDetails from "../MovieDetails/MovieDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMovieByID } from "../../utils/APICalls";
import styles from "./MovieModal.module.css";

export default function MovieModal() {
    const {id} = useParams();
    const [movie, setMovie] = useState();

    const navigate = useNavigate();
    const location = useLocation();

    //We grab previous url information from the referring movie card through useLocation to allow for back navigation to previous url/content
    const previous = location.state?.from?.pathname || '/';

    //API call to specific movie detail information based on url id parameter
    useEffect(() => {
        const fetchMovie = async () => {
            const data = await getMovieByID(id);
            setMovie(data);
        }
        fetchMovie();
    }, [id]);

    //On modal creation create an event listener to allow for esc key to "close" the modal. In this case we navigate to the previous url/content
    useEffect(() => {
        const close = (e) => {
            if(e.keyCode === 27){
                navigate(previous);
            }
        }

        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, [navigate]);

    return (
        <>
            {/* Show the detailed movie card with createPortal. If the movie information is not ready yet show a loading element for visual clarity and functionality */}
            {createPortal(
                <div className={styles.test}>
                    {movie ? <MovieDetails previous={previous} movie={movie}/> : <div className={styles.loading}>Loading...</div>}
                </div>,
                document.body
            )}
        </>
    )
}
