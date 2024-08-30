
import { useEffect } from "react";
import useData from "../custom-hooks/useData";
import { baseImgUrl } from "../utils/constants";
import Card from "../components/Card";

const Home = () => {
    const { getAllMovies, getAllTVShows, allMovies, allTvShows } = useData();

    useEffect(() => {
        getAllMovies();
        getAllTVShows();
    }, [getAllMovies, getAllTVShows]);

    return (
        <div className="container box column">
            <div className="box column">
                <h2 className="full-width">Movies</h2>
                <div className="box">
                    {allMovies.map(movie => (
                        <Card type={"movie"} movie={movie} key={movie.id} imgUrl={`${baseImgUrl}/${movie.backdrop_path}`} />
                    ))}
                </div>
            </div>

            <div className="box column">
                <h2 className="full-width">TV Shows</h2>
                <div className="box">
                    {allTvShows.map(show => (
                        <Card type={"tv"} movie={show} key={show.id} imgUrl={`${baseImgUrl}/${show.backdrop_path}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;

