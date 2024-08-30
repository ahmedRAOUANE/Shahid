import { useEffect } from "react";
import useData from "../custom-hooks/useData";
import { baseImgUrl } from "../utils/constants";
import Card from "../components/Card";

const Movies = () => {
  const { getTopRatedMovies, topRatedMovies } = useData();

  useEffect(() => {
    getTopRatedMovies();

  }, [getTopRatedMovies])

  return (
    <div className="container">
      <h2>Movies</h2>

      <div className="box">
        {topRatedMovies.map(movie => (
          <Card type={"movie"} movie={movie} key={movie.id} imgUrl={`${baseImgUrl}/${movie.backdrop_path}`} />
        ))}
      </div>
    </div>
  )
}

export default Movies