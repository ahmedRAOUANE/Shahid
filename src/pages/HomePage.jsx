
import { useEffect } from "react";
import useData from "../custom-hooks/useData";
import { baseImgUrl } from "../utils/constants";
import Card from "../components/Card";

const Home = () => {
    const { getTrending, trending } = useData();

    useEffect(() => {
        getTrending();
    }, [getTrending]);

    return (
        <div className="container box column">
            <div className="box column">
                <h2 className="full-width">Latest</h2>
                <div className="box">
                    {trending.map(item => (
                        <Card type={item.media_type} item={item} key={item.id} imgUrl={`${baseImgUrl}/${item.backdrop_path}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;

