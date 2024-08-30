import { useEffect } from "react";
import useData from "../custom-hooks/useData";
import { baseImgUrl } from "../utils/constants";
import Card from "../components/Card";

const TVShows = () => {
  const { getTopRatedTVShows, topRatedTvShows } = useData();

  useEffect(() => {
    getTopRatedTVShows();

  }, [getTopRatedTVShows])

  return (
    <div className="container">
      <h2>TV Shows</h2>

      <div className="box">
        {topRatedTvShows.map(show => (
          <Card type={"tv"} movie={show} key={show.id} imgUrl={`${baseImgUrl}/${show.backdrop_path}`} />
        ))}
      </div>
    </div>
  )
}

export default TVShows

