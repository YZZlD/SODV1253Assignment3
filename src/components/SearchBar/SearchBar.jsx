import styles from "./SearchBar.module.css"

export default function SearchBar({handleSearch}) {

    //Grab the value from the search input field and pass it into the callback function. While preventing page reload and reset field
    const handleSubmit = (e) => {
        e.preventDefault();
        const searchTerm = e.target.elements.searchBar.value;
        if(!searchTerm.trim()) return;
        handleSearch(searchTerm);
        e.target.reset();
    }

    return (
        <>
            {/* Hold the search within a form to allow for enter or button submit for the data. */}
            <form onSubmit={handleSubmit}>
                <div className={styles.searchBar}>
                    <input className={styles.searchInput} name="searchBar" type="text" placeholder="Search for a movie..."></input>
                    <button className={styles.searchButton} type="submit">Search</button>
                </div>
            </form>

        </>
    )
}
