import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import MovieCard from './components/MovieCard/MovieCard';

function App() {

  const [movies, setMovies] = useState([]);

  //This is WIP but will be used to render top rated or search. This will probably be split later
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovieBySearch();
      setMovies(data);
    }

    fetchMovies();
  }, []);

  //This is a test implementation and will be properly implemented later
  async function getMovieBySearch() {
    const url = 'https://api.themoviedb.org/3/search/movie?query=inception';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
      }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    return data.results;
  }

  // async function getSpecificMovie() {
  //   const url = 'https://api.themoviedb.org/3/movie/27205';
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
  //     }
  //   }

  //   const res = await fetch(url, options);
  //   const data = await res.json();
  //   console.log(data);
  // }


  return (
      <>
        {movies.map((movie) => {
          return <MovieCard movie={movie}/>
        })}
        <SearchBar />
      </>
    )
}


export default App
