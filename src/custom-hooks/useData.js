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

    return {
        trending,
        topRatedMovies,
        topRatedTvShows,
        details,
        getTrending,
        getTopRatedTVShows,
        getTopRatedMovies,
        getDetails
    }
}

export default useData

