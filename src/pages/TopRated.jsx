import { useEffect } from "react";
import useData from "../custom-hooks/useData";
import Page from "../components/Page";

const TopRated = () => {
  const { getTopRatedMovies, topRatedMovies } = useData();

  useEffect(() => {
    getTopRatedMovies();

  }, [getTopRatedMovies])

  return <Page items={topRatedMovies} pageTitle={"Top Rated Movies"} />
}

export default TopRated