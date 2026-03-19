import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './MoviesPage.module.css';
import MovieCard from '../../components/MovieCard/MovieCard';
import PaginationButton from '../../components/PaginationButton/PaginationButton';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { getMoviesByGenre, getMoviesByTopRated, getMoviesBySearch } from '../../utils/APICalls';

/*
    The MoviePage component handles most of the heavy lifting of the SPA approach for this application through useEffect hooks.
    It can handle routes for home route (redirects to top rated), top rated, genres and search queries.
*/

export default function MoviePage () {
    //We grab all possible params from the parameters of the react router request
    const {page, query, genre} = useParams();
    //Navigation is used for internal correction and handling changing of content through react router and triggering the modal overlay
    const navigate = useNavigate();

    //Checks against the page value to make sure it either a) exists or b) is valid
    const currentPage = Math.min(Math.max((Number(page) || 1), 1), 500);

    //Movies are stored in state for dynamic updates. The last page count is also stored in state to update the pagination buttons
    const [movies, setMovies] = useState([]);
    const [lastPage, setLastPage] = useState(500);

    //Routing and content displaying is handling through navigating from the pagination buttons. Each route is determined based on the presence
    //or lack of url parameters.
    function changeCurrentPage(step) {
        if(query && (currentPage + step >= 1 && currentPage + step <= lastPage)) navigate(`/movies/search/${query}/${currentPage + step}`);
        else if(genre && (currentPage + step >= 1 && currentPage + step <= lastPage)) navigate(`/movies/genres/${genre}/${currentPage + step}`)
        else if(currentPage + step >= 1 && currentPage + step <= lastPage) navigate(`/movies/topRated/${currentPage + step}`);
    }

    function executeSearchQuery(query) {
        navigate(`/movies/search/${query}`);
    }

    //Initial useEffect hook to grab the necessary movie api call and to check the total pages for pagination logic.
    useEffect(() => {
        const fetchMovies = async (movieCallback) => {
            const data = await movieCallback();
            setMovies(data.results);
            setLastPage(Math.min(data.total_pages, 500));
        }

        if(genre) fetchMovies(() => getMoviesByGenre(genre, currentPage));
        else if(query) fetchMovies(() => getMoviesBySearch(query, currentPage));
        else fetchMovies(() => getMoviesByTopRated(currentPage));
    }, [page, query, genre]);

    //This useEffect serves as a check against invalid range page values in url parameter on direct linking from the user.
    useEffect(() => {
        if(page > lastPage)
        {
            if (query) navigate(`/movies/search/${query}/${lastPage}`);
            else if(genre) navigate(`/movies/genres/${genre}/${lastPage}`)
            else navigate(`/movies/topRated/${lastPage}`);
        };

        if(page < 1)
        {
            if (query) navigate(`/movies/search/${query}/1`, {replace: true});
            else if(genre) navigate(`/movies/genres/${genre}/1`, {replace: true});
            else navigate(`/movies/topRated/1`, {replace: true});
        }
    }, [page, lastPage]);


    return (
        <>
            <NavigationBar handleSearch={executeSearchQuery}/>
            {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie}/>
            })}
            {/* Pagination buttons are dynamically displayed based on whether the entry is the first or last entry */}
            <div className={styles.paginationContainer}>
                {currentPage != 1 && (<PaginationButton message="Previous 20" handlePageChange={() => changeCurrentPage(-1)}/>)}
                {(currentPage != lastPage) && <PaginationButton message="Next 20" handlePageChange={() => changeCurrentPage(1)}/>}
            </div>
      </>
    )
}
