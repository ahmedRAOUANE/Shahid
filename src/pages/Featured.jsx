import { useEffect } from "react";
import useData from "../custom-hooks/useData"
import Page from "../components/Page";

const Featured = () => {
    const { getFeaturedMovies, featuredMovies } = useData();

    useEffect(() => {
        getFeaturedMovies()
    }, [getFeaturedMovies])

    return <Page items={featuredMovies} pageTitle={"Featured Movies"} />
}

export default Featured