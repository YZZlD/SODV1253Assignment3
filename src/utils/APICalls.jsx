// All necessary API calls are put into this util file to simplify and shorten references where necessary, and allow for reusability if that
//mattered within the context of the project.

//Pagination is handled through API calls as TMDB automatically sends data in batches of 20 with a page parameter.
//Therefore pagination is handled by tracking and incrementing the current page and checking against the maximum
//number of pages returned in the API call for a specific query (NOTE: There is an internal limit on the API
//stopping any page calls past 500 hence the presence of hard coded 500 checks in other sections of code)




//Here we grab all movies from the query domain parameter and paginate through current page
export async function getMoviesBySearch(query, currentPage) {
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
    return data;
}

//This query grabs all top rated movies and paginates them
export async function getMoviesByTopRated(currentPage) {
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
    return data;
}

//This grabs the movies by genre and sorts them by popularity while filtering out low vote count movies
export async function getMoviesByGenre(genre, currentPage) {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&sort_by=popularity.desc&page=${currentPage}&vote_count.gte=500`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application.json',
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    return data;
}

//This uses the movie id from a movie object to get its detailed entry from the TMDB API
export async function getMovieByID(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    return data;
}
