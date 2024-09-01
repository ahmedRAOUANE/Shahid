import { useEffect } from "react";
import useData from "../custom-hooks/useData";
import Page from "../components/Page";

const Upcoming = () => {
    const { getUpcomingMovies, upcomingMovies } = useData();

    useEffect(() => {
        getUpcomingMovies();
    }, [getUpcomingMovies]);

    return <Page items={upcomingMovies} pageTitle={"Upcoming Movies"} />
}

export default Upcoming