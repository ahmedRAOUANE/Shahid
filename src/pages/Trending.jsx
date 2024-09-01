
import { useEffect } from "react";
import useData from "../custom-hooks/useData";
import Page from "../components/Page";

const Trending = () => {
    const { getTrending, trending } = useData();

    useEffect(() => {
        getTrending();
    }, [getTrending]);

    return <Page items={trending} pageTitle={"Trending Movies"} />;
}

export default Trending;

