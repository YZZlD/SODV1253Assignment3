
import { Routes, Route, useLocation} from 'react-router-dom'
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieModal from './components/MovieModal/MovieModal';

function App() {

  const location = useLocation();
  const background = location.state?.background;

  return (
      <>
        {/* These are the base routes */}
        <Routes location={background || location}>
          <Route path="/" element={<MoviesPage />}></Route>
          <Route path="/movies/topRated/:page?" element={<MoviesPage />} />
          <Route path="/movies/search/:query?/:page?" element={<MoviesPage />} />
          <Route path="/movies/genres/:genre?/:page?" element={<MoviesPage />} />
          {/* For direct routing I decided to route through the Modal component to simplify API call information to one component
          instead of having to grab information from within the MovieDetails component itself. This also improves consistency across the application*/}
          <Route path="/movies/:id/" element={<MovieModal />} />
        </Routes>

        {/* If there is a background location reference than the modal route is shown in addition to a base route
        This doesn't actually come up as the modal covers all of the viewport, however for an overlay this is the best approach
        and results in the least amount of refactoring in the future if behaviour changes were desired */}
        {background && (
          <Routes>
            <Route path="/movies/:id" element={<MovieModal/>} />
          </Routes>
        )}
      </>
    )
}


export default App
