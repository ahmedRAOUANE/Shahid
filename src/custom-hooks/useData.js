import { useCallback, useState } from "react";
import { accessToken, baseUrl } from "../utils/constants";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
    }
};

const useData = () => {
    const [trending, setTrending] = useState([]);

    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const [details, setDetails] = useState(null);

    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const [trailer, setTrailer] = useState(null);

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [featuredMovies, setFeaturedMovies] = useState([])

    // Get the trending movies
    const getTrending = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/trending/movie/day`, options);
            const data = await response.json();
            setTrending(data.results);
        } catch (err) {
            console.log('Error Getting all movies: ', err);
        }
    }, [])

    // get the top rated movies
    const getTopRatedMovies = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/movie/top_rated`, options);
            const data = await response.json()
            setTopRatedMovies(data.results)
        } catch (err) {
            console.log('Error Getting top rated movies: ', err);
        }
    }, [])

    const getDetails = useCallback(async (type, id) => {
        try {
            const response = await fetch(`${baseUrl}/movie/${id}`, options);
            const data = await response.json();

            setDetails(data);
        } catch (err) {
            console.error("Failed to fetch details:", err);
        }
    }, [])

    // Search for movies
    const search = useCallback(async (query) => {
        if (!query) return;
        setSearchLoading(true);
        setSearchError(null);

        try {
            const response = await fetch(`${baseUrl}/search/movie?query=${encodeURIComponent(query)}`, options);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (err) {
            console.error('Error searching: ', err);
            setSearchError('Failed to fetch search results.');
        } finally {
            setSearchLoading(false);
        }
    }, []);

    // Add an item to the watch list
    const addToWatchList = (item, mediaType) => {
        const watchList = getWatchList();

        // Check if the item is already in the watch list to prevent duplicates
        const isAlreadyInWatchList = isInWatchList(item.id);
        if (!isAlreadyInWatchList) {
            watchList.push({ ...item, media_type: mediaType });
            localStorage.setItem("watchList", JSON.stringify(watchList));
        }
    }

    const isInWatchList = (id) => {
        const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
        return watchList.some(watchItem => watchItem.id === id);
    };

    const removeFromWatchList = (id, updateStateCallback) => {
        const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
        const updatedWatchList = watchList.filter(watchItem => watchItem.id !== id);
        localStorage.setItem("watchList", JSON.stringify(updatedWatchList));

        // Invoke the callback to update the state
        if (updateStateCallback) {
            updateStateCallback(false);
        }
    };

    // Get the watch list from localStorage
    const getWatchList = () => {
        return JSON.parse(localStorage.getItem("watchList")) || [];
    }

    // get movie trailer
    const getTrailer = useCallback(async (id) => {
        try {
            const response = await fetch(`${baseUrl}/movie/${id}/videos`, options);
            const data = await response.json();
            const trailers = data.results.filter(video => video.type === "Trailer" && video.site === "YouTube");

            if (trailers.length > 0) {
                setTrailer(trailers[0]); // Set the first available trailer
            } else {
                setTrailer(null); // No trailer available
            }
        } catch (err) {
            console.error("Failed to fetch trailer:", err);
            setTrailer(null);
        }
    }, []);

    // Get the upcomming movies
    const getUpcomingMovies = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/movie/upcoming`, options);
            const data = await response.json();
            setUpcomingMovies(data.results);
        } catch (err) {
            console.error('Error fetching upcoming movies: ', err);
        }
    }, []);

    // get Featured Movies
    const getFeaturedMovies = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/movie/now_playing`, options);
            const data = await response.json();
            setFeaturedMovies(data.results);
        } catch (err) {
            console.error("Error fetching featured movies: ", err);
        }
    }, []);

    return {
        trending,
        topRatedMovies,
        details,
        searchResults,
        searchLoading,
        searchError,
        trailer,
        upcomingMovies,
        featuredMovies,

        getTrending,
        getTopRatedMovies,
        getDetails,
        search,
        addToWatchList,
        removeFromWatchList,
        getWatchList,
        isInWatchList,
        getTrailer,
        getUpcomingMovies,
        getFeaturedMovies
    }
}

export default useData

