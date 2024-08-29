/* eslint-disable react/prop-types */
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./Navbar";
import useModal from "../custom-hooks/useModal";

const Header = () => {

    const { openWindow } = useModal()

    return (
        <header>
            <div className="box">
                <h1>Shahid</h1>

                {/* small media */}
                <div className="hide-in-large">
                    <button onClick={() => openWindow("userNavList")} className="icon" style={{ width: "40px" }}>
                        <FontAwesomeIcon icon={faBars} size="xl" />
                    </button>
                </div>

                {/* large media */}
                <div className="hide-in-small">
                    <NavBar className="text-center" />
                </div>

                {/* Search */}
                <button className="hide-in-large">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
                </button>
            </div>
        </header>
    );
};

export default Header;
