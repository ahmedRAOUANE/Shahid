
import { useEffect } from "react";
import useData from "../custom-hooks/useData";
import { baseImgUrl } from "../utils/constants";

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
                        <div key={movie.id} className="card box column paper outline btn" style={{ backgroundImage: `url(${baseImgUrl}/${movie.backdrop_path})` }}>
                            <div className="card-body full-width box column">
                                <h3 className="card-title">{movie.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="box column">
                <h2 className="full-width">TV Shows</h2>
                <div className="box">
                    {allTvShows.map(show => (
                        <div key={show.id} className="card box column paper outline btn" style={{ backgroundImage: `url(${baseImgUrl}/${show.backdrop_path})` }}>
                            <div className="card-body full-width box column">
                                <h3 className="card-title">{show.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;

