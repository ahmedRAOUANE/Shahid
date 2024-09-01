/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import useData from "../custom-hooks/useData";
import { useEffect, useState } from "react";
import { baseImgUrl } from "../utils/constants";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Details = () => {
    const { type, id } = useParams();
    const [inWatchList, setInWatchList] = useState(false);

    const { getDetails, details, addToWatchList, isInWatchList, removeFromWatchList, getTrailer, trailer } = useData();

    useEffect(() => {
        getDetails(type, id);
        getTrailer(id);
    }, [getDetails, type, id, getTrailer]);

    useEffect(() => {
        setInWatchList(isInWatchList(Number(id)));
    }, [id, isInWatchList]);

    if (!details) return <p>Loading...</p>;

    return details
        ? (
        <div className="full-width full-height" style={{
            backgroundImage: `url(${baseImgUrl}/${details.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}>
            <div className="box column js-start" style={{ backdropFilter: "brightness(0.5)" }}>
                <div className="box full-width" style={{ marginTop: "20px" }}>
                    <div className="box column full-width" style={{ padding: "0 20px" }}>
                            <h1 className="full-width" style={{ color: "white" }}>{details.title || details.name}</h1>

                        <div className="box column ai-start full-width">
                                <p className="overview" style={{ color: "white" }}>{details.overview}</p>

                            <div className="box jc-start">
                                {details.genres.map(genere => (
                                    <span className="small" key={genere.id}>{genere.name}</span>
                                ))}
                            </div>

                                <div className="full-width box jc-start">
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
        : (
            <div>No Details available For Now, Try Again Later..</div>
        )
}

export default Details;
