/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Card = ({ item, imgUrl, type, className = "", noText = false }) => {
    return (
        <Link to={`/details/${type}/${item.id}`} title={item.overview} className={`card box column paper outline btn ${className}`} style={{ backgroundImage: `url(${imgUrl})` }}>
            {!noText && (
                <div className="card-body full-width box column">
                    <h3 className="card-title">{item.title ? item.title : item.name}</h3>
                </div>
            )}
        </Link>
    )
}

export default Card

