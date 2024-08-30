import { useEffect } from "react";
import useData from "../custom-hooks/useData";
import { baseImgUrl } from "../utils/constants";

const Movies = () => {
  const { getTopRatedMovies, topRatedMovies } = useData();

  useEffect(() => {
    getTopRatedMovies();

  }, [getTopRatedMovies])

  return (
    <div className="container">
      <h2>Movies</h2>

      <div className="box">
        {topRatedMovies.map(show => (
          <div key={show.id} className="card box column paper outline btn" style={{ backgroundImage: `url(${baseImgUrl}/${show.backdrop_path})` }}>
            <div className="card-body full-width box column">
              <h3 className="card-title">{show.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Movies