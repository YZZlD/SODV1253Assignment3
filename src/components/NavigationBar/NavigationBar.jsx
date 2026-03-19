import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './NavigationBar.module.css';

export default function NavigationBar({ handleSearch }) {
    const navigate = useNavigate();

    //Since this element does not have access to dynamic genre information we must build a reference dictionary for the genres for linking and display.
    const genres = [
        {id: 28, name: "Action"},
        {id: 12, name: "Adventure"},
        {id: 16, name: "Animation"},
        {id: 35, name: "Comedy"},
        {id: 80, name: "Crime"},
        {id: 99, name: "Documentary"},
        {id: 18, name: "Drama"},
        {id: 10751, name: "Family"},
        {id: 14, name: "Fantasy"},
        {id: 36, name: "History"},
        {id: 27, name: "Horror"},
        {id: 10402, name: "Music"},
        {id: 9648, name: "Mystery"},
        {id: 10749, name: "Romance"},
        {id: 878, name: "Science Fiction"},
        {id: 53, name: "Thriller"},
        {id: 10770, name: "TV Movie"},
        {id: 10752, name: "War"},
        {id: 37, name: "Western"}
    ]

    return (
        <div className={styles.navContainer}>
            {/* Button routing to top rated movies display */}
            <div className={styles.logo} onClick={() => navigate('/movies/topRated')}>Top Rated</div>

            <div className={styles.dropdown}>
                {/* This dropdown maps the genres array and shows the different genres with routing to the corresponding displays for each genre on click */}
                <button className={styles.dropbtn}>Genres</button>
                <div className={styles.dropdownContent}>
                    {genres.map((genre) => (
                        <div key={genre.id} onClick={() => navigate(`/movies/genres/${genre.id}`)}>
                            {genre.name}
                        </div>
                    ))}
                </div>
            </div>

            <SearchBar handleSearch={handleSearch} />
        </div>
    );
}
