/* eslint-disable react/prop-types */

const Card = ({ item, imgUrl, className = "", noText = false }) => {
    return (
        <div title={item.overview} className={`card box column paper outline btn ${className}`} style={{ backgroundImage: `url(${imgUrl})` }}>
            {!noText && (
                <div className="card-body full-width box column">
                    <h3 className="card-title">{item.title ? item.title : item.name}</h3>
                </div>
            )}
        </div>
    )
}

export default Card

