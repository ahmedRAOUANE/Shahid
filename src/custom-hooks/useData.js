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
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedTvShows, setTopRatedTvShows] = useState([]);

    const [allMovies, setAllMovies] = useState([]);
    const [allTvShows, setAllTvShows] = useState([]);

    const [details, setDetails] = useState(null);

    // Fetch all movies sorted by release date
    const getAllMovies = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/discover/movie?sort_by=release_date.desc`, options);
            const data = await response.json();
            setAllMovies(data.results);
        } catch (err) {
            console.log('Error Getting all movies: ', err);
        }
    }, []);

    // Fetch all TV shows sorted by release date
    const getAllTVShows = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/discover/tv?sort_by=first_air_date.desc`, options);
            const data = await response.json();
            setAllTvShows(data.results);
        } catch (err) {
            console.log('Error Getting all TV shows: ', err);
        }
    }, []);

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

    return {
        allMovies,
        allTvShows,
        topRatedMovies,
        topRatedTvShows,
        details,
        getTopRatedTVShows,
        getTopRatedMovies,
        getAllMovies,
        getAllTVShows,
        getDetails
    }
}

export default useData

