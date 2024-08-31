/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import useData from "../custom-hooks/useData";
import { useEffect, useState } from "react";
import { baseImgUrl } from "../utils/constants";
import {
    faComment, // you can remove this if unused
    faMinus,
    faPlay, // you can remove this if unused
    faPlus,
    faStarHalfStroke // you can remove this if unused
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Details = () => {
    const { type, id } = useParams();
    const [inWatchList, setInWatchList] = useState(false);

    const { getDetails, details, addToWatchList, isInWatchList, removeFromWatchList, getTrailer, trailer } = useData();

    useEffect(() => {
        getDetails(type, id);
        getTrailer(type, id);
    }, [getDetails, type, id, getTrailer]);

    useEffect(() => {
        setInWatchList(isInWatchList(Number(id)));
    }, [id, isInWatchList]);

    if (!details) return <p>Loading...</p>;

    return (
        <div className="full-width full-height" style={{
            backgroundImage: `url(${baseImgUrl}/${details.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}>
            <div className="box column js-start" style={{ backdropFilter: "brightness(0.5)" }}>
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

                            <div className="full-width box jc-start">
                                {/* for the watch feature */}
                                {/* <button className="transparent btn box">
                                    <FontAwesomeIcon icon={faPlay} />
                                    <span>Watch Now</span>
                                </button> */}

                                {inWatchList ? (
                                    <button
                                        onClick={() => removeFromWatchList(Number(id), setInWatchList)}
                                        className="transparent btn box"
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                        <span>Remove from Watch List</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            addToWatchList(details, type);
                                            setInWatchList(true);
                                        }}
                                        className="transparent btn box"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                        <span>Add To Watch List</span>
                                    </button>
                                )}
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

                {/* rate and comment features */}
                {/* <div className="full-width box jc-start paper">
                    <button className="transparent btn box">
                        <FontAwesomeIcon icon={faStarHalfStroke} />
                        <span>Rate</span>
                    </button>
                    <button className="transparent btn box">
                        <FontAwesomeIcon icon={faComment} />
                        <span>Comment</span>
                    </button>
                </div> */}

                {/* Trailer */}
                {trailer && (
                    <div className="trailer-container box center-x">
                        <div className="trailer paper disable-guitters">
                            <iframe
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Details;
