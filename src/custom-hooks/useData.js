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

    // Fetch all movies sorted by release date
    const getAllMovies = useCallback(async () => {
        const response = await fetch(`${baseUrl}/discover/movie?sort_by=release_date.desc`, options);
        const data = await response.json();
        setAllMovies(data.results);
    }, []);

    // Fetch all TV shows sorted by release date
    const getAllTVShows = useCallback(async () => {
        const response = await fetch(`${baseUrl}/discover/tv?sort_by=first_air_date.desc`, options);
        const data = await response.json();
        setAllTvShows(data.results);
    }, []);

    // Fetch the top rated tv shows
    const getTopRatedTVShows = useCallback(async () => {
        const response = await fetch(`${baseUrl}/tv/top_rated`, options);
        const data = await response.json()
        setTopRatedTvShows(data.results)
    }, [])

    // Fetch the top rated movies
    const getTopRatedMovies = useCallback(async () => {
        const response = await fetch(`${baseUrl}/movie/top_rated`, options);
        const data = await response.json()
        setTopRatedMovies(data.results)
    }, [])

    return {
        allMovies,
        allTvShows,
        topRatedMovies,
        topRatedTvShows,
        getTopRatedTVShows,
        getTopRatedMovies,
        getAllMovies,
        getAllTVShows
    }
}

export default useData

