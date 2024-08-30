/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Card = ({ movie, imgUrl, type }) => {
    return (
        <Link to={`/details/${type}/${movie.id}`} title={movie.overview} className="card box column paper outline btn" style={{ backgroundImage: `url(${imgUrl})` }}>
            <div className="card-body full-width box column">
                <h3 className="card-title">{movie.title ? movie.title : movie.name}</h3>
            </div>
        </Link>
    )
}

export default Card