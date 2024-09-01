/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { baseImgUrl } from "../utils/constants"
import Card from "./Card"

const Page = ({ items, pageTitle }) => {
    return (
        <div className="container box column">
            <div className="box column full-width">
                {items ? (
                    <>
                        <h2 className="full-width">{pageTitle}</h2>
                        <div className="box">
                            {items.map(item => (
                                <Link to={`/details/movie/${item.id}`} key={item.id}>
                                    <Card item={item} imgUrl={`${baseImgUrl}/${item.backdrop_path}`} />
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <div>Something went wrong, try again later..</div>
                )}
            </div>
        </div>
    )
}

export default Page