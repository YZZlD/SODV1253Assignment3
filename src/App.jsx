
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'


import MoviesPage from './pages/MoviesPage/MoviesPage';

function App() {



  //This is WIP but will be used to render top rated or search. This will probably be split later

  //This is a test implementation and will be properly implemented later


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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesPage />}></Route>
          <Route path="/movies/topRated/:page?" element={<MoviesPage />} />
          <Route path="/movies/search/:query?/:page?" element={<MoviesPage />}/>
        </Routes>
      </BrowserRouter>
    )
}


export default App
