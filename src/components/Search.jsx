import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Card from "./Card";
import { useState } from "react";
import useData from "../custom-hooks/useData";
import { baseImgUrl } from "../utils/constants";
import { Link } from "react-router-dom";
import useModal from "../custom-hooks/useModal";

const Search = () => {
    const { search, searchResults, searchLoading, searchError } = useData();
    const [query, setQuery] = useState("");

    const { closeWindow } = useModal()

    const handleSearch = (e) => {
        e.preventDefault();
        search(query);
    };

    { searchLoading && <p>Loading...</p> }
    { searchError && <p>{searchError}</p> }

    return (
        <div className="box column">
            <div className="box full-width search-input">
                <h2 className="disable-guitters hide-in-small">Search</h2>

                <form className="box full-width" onSubmit={handleSearch}>
                    <input
                        className="full-width"
                        placeholder="Search"
                        type="search"
                        name="search"
                        id="search"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        autoFocus
                    />

                    <button type="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
                    </button>
                </form>
            </div>

            <div className="box column search-results scroller">
                {searchResults.length > 0 ? (
                    <ul className="box column">
                        {searchResults.map((result) => (
                            <li className="btn full-width" key={result.id} onClick={closeWindow}>
                                <Link className="box jc-start ai-start" to={`/details/${result.media_type}/${result.id}`}>
                                    <Card noText className="mini-card" item={result} imgUrl={`${baseImgUrl}/${result.backdrop_path}`} />

                                    <div className="box column ai-start full-width">
                                            <h2 className="full-width disable-guitters">
                                                {result.title || result.name}
                                            </h2>

                                        <div className="box">
                                            <strong>Release Date:</strong> {result.release_date || result.first_air_date}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Search movies, TV shows, people...</p>
                )}
            </div>
        </div>
    )
}

export default Search