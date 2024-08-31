import useData from "../custom-hooks/useData";
import Card from "../components/Card";
import { baseImgUrl } from "../utils/constants";

const WatchList = () => {
    const { getWatchList } = useData();

    const watchList = getWatchList();

    return (
        <div className="container">
            <h2>Watch List</h2>

            <div className="box jc-start">
                {watchList.map(show => (
                    <Card type={show.media_type} item={show} key={show.id} imgUrl={`${baseImgUrl}/${show.backdrop_path}`} />
                ))}
            </div>
        </div>
    )
}

export default WatchList

