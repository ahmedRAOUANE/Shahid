import { useEffect } from "react";
import useData from "../custom-hooks/useData";
import { baseImgUrl } from "../utils/constants";

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
          <div key={show.id} className="card box column paper outline btn" style={{ backgroundImage: `url(${baseImgUrl}/${show.backdrop_path})` }}>
            <div className="card-body full-width box column">
              <h3 className="card-title">{show.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TVShows

