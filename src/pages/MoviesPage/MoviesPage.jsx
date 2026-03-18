import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './MoviesPage.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieCard from '../../components/MovieCard/MovieCard';
import PaginationButton from '../../components/PaginationButton/PaginationButton';

export default function MoviePage () {
    const {page, query} = useParams();
    const navigate = useNavigate();

    const currentPage = Math.min(Math.max((Number(page) || 1), 1), 500);

    const [movies, setMovies] = useState([]);
    const [lastPage, setLastPage] = useState(500);

    function changeLastPage(page) {
        setLastPage(Math.min(page, 500));
    }

    function changeCurrentPage(step) {
        if(query && (currentPage + step >= 1 && currentPage + step <= lastPage)) navigate(`/movies/search/${query}/${currentPage + step}`);
        else if(currentPage + step >= 1 && currentPage + step <= lastPage) navigate(`/movies/topRated/${currentPage + step}`);
    }

    function executeSearchQuery(query) {
        navigate(`/movies/search/${query}`);
    }

    useEffect(() => {
        const fetchMovies = async (movieCallback) => {
            const data = await movieCallback();
            setMovies(data);
        }

        if(query) fetchMovies(getMovieBySearch);
        else fetchMovies(getTopRatedMovies);
    }, [page, query]);

    useEffect(() => {
        if(page > lastPage)
        {
            if (query) navigate(`/movies/search/${query}/${lastPage}`);
            else navigate(`/movies/topRated/${lastPage}`);
        };

        if(page < 1)
        {
            if (query) navigate(`/movies/search/${query}/1`, {replace: true});
            else navigate(`/movies/topRated/1`, {replace: true});
        }
    }, [page, lastPage]);

    async function getTopRatedMovies() {
    const url = `https://api.themoviedb.org/3/movie/top_rated?page=${currentPage}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
      }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    changeLastPage(data.total_pages);
    return data.results;
  }

  async function getMovieBySearch() {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${currentPage}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
      }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data.results);
    changeLastPage(data.total_pages);
    return data.results;
  }

    return (
        <>
            <SearchBar handleSearch={executeSearchQuery}/>
            {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie}/>
            })}
            <div className={styles.paginationContainer}>
                {currentPage != 1 && (<PaginationButton message="Previous 20" handlePageChange={() => changeCurrentPage(-1)}/>)}
                {(currentPage != lastPage) && <PaginationButton message="Next 20" handlePageChange={() => changeCurrentPage(1)}/>}
            </div>
      </>
    )
}
