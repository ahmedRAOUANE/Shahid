import { useCallback, useState } from "react";
import { autherizationKey, baseUrl } from "../utils/constants";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${autherizationKey}`
    }
};

const useData = () => {
    const [trending, setTrending] = useState([]);

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedTvShows, setTopRatedTvShows] = useState([]);

    const [details, setDetails] = useState(null);

    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const getTrending = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/trending/all/day`, options);
            const data = await response.json();
            setTrending(data.results);
        } catch (err) {
            console.log('Error Getting all movies: ', err);
        }
    }, [])

    // Fetch the top rated tv shows
    const getTopRatedTVShows = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/tv/top_rated`, options);
            const data = await response.json()
            setTopRatedTvShows(data.results)
        } catch (err) {
            console.log('Error Getting top rated tv shows: ', err);
        }
    }, [])

    // Fetch the top rated movies
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
            const response = await fetch(`${baseUrl}/${type}/${id}`, options);
            const data = await response.json();
            setDetails(data);
        } catch (err) {
            console.error("Failed to fetch details:", err);
        }
    }, [])

    // Search for movies, TV shows, or people
    const search = useCallback(async (query) => {
        if (!query) return;
        setSearchLoading(true);
        setSearchError(null);

        try {
            const response = await fetch(`${baseUrl}/search/multi?query=${encodeURIComponent(query)}`, options);
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
        const watchList = JSON.parse(localStorage.getItem("watchList")) || [];

        // Check if the item is already in the watch list to prevent duplicates
        const isAlreadyInWatchList = watchList.some(watchItem => watchItem.id === item.id);
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

    return {
        trending,
        topRatedMovies,
        topRatedTvShows,
        details,
        searchResults,
        searchLoading,
        searchError,
        getTrending,
        getTopRatedTVShows,
        getTopRatedMovies,
        getDetails,
        search,
        addToWatchList,
        removeFromWatchList,
        getWatchList,
        isInWatchList
    }
}

export default useData

