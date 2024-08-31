import { useParams } from "react-router-dom";
import useData from "../custom-hooks/useData";
import { useEffect } from "react";
import { baseImgUrl } from "../utils/constants";
import { faComment, faPlay, faPlus, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Details = () => {
    const { type, id } = useParams();
    const { getDetails, details } = useData();

    useEffect(() => {
        getDetails(type, id)
    }, [getDetails, type, id])

    console.log(details);

    // return the loading comoponent
    if (!details) return <p>Loading...</p>;

    return (
        <div className="full-width full-height" style={{
            backgroundImage: `url(${baseImgUrl}/${details.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}>
            <div className="box column" style={{ backdropFilter: "brightness(0.5)" }}>
                <div className="box full-width" style={{ marginTop: "20px" }}>
                    <div className="box column full-width" style={{ padding: "0 20px" }}>
                        <h1 className="full-width">{details.title || details.name}</h1>

                        <div className="box column ai-start full-width">
                            <p className="overview">{details.overview}</p>

                            <div className="box jc-start">
                                {details.genres.map(genere => (
                                    <span className="small" key={genere.id}>{genere.name}</span>
                                ))}
                            </div>

                            <div className="full-width">
                                {/* link to watch page if posible */}
                                <button className="transparent btn box">
                                    <FontAwesomeIcon icon={faPlay} />
                                    <span>Watch now</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {details.poster_path && (
                        <div className="full-width center-x center-y details-poster hide-in-small">
                            <img className="paper disable-guitters" src={`${baseImgUrl}/${details.poster_path}`} alt={details.title || details.name} />
                        </div>
                    )}
                </div>

                <div className="more-details paper full-width">
                    <h3>More Details</h3>

                    <div className="box">
                        <p>
                            <strong>Original Title:</strong> {details.original_title || details.title || details.name}
                        </p>
                        <p>
                            <strong>Status:</strong> {details.status}
                        </p>
                        <p>
                            <strong>Popularity:</strong> {details.popularity}
                        </p>
                        <p>
                            <strong>Release Date:</strong> {details.release_date || details.first_air_date}
                        </p>
                    </div>
                </div>

                <div className="full-width box jc-start paper">

                    {/* check fist if the user is logged in */}
                    {/* this button will open a window and let the user rate the movie or tv show */}
                    <button className="transparent btn box">
                        <FontAwesomeIcon icon={faStarHalfStroke} />
                        <span>Rate</span>
                    </button>

                    <button className="transparent btn box">
                        <FontAwesomeIcon icon={faComment} />
                        <span>Comment</span>
                    </button>

                    <button className="transparent btn box">
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add to List</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Details

