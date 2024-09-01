import useData from "../custom-hooks/useData";
import Page from "../components/Page";

const WatchList = () => {
    const { getWatchList } = useData();

    const watchList = getWatchList();

    return watchList.length > 0 ? (
        <Page items={watchList} pageTitle={"Watch List"} />
    ) : (
        <div className="container">
                <h2 className="full-width">Watch List</h2>
                <p>No Movies Have Been Added</p>
        </div>
    )
}

export default WatchList

