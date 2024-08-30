/* eslint-disable react/prop-types */
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./Navbar";
import useModal from "../custom-hooks/useModal";
import { useSelector } from "react-redux";

const Header = () => {
    const isOpen = useSelector(state => state.modalSlice.isOpen)

    const { openWindow, toggleWindow } = useModal()

    return (
        <header>
            <div className="box">
                <h1>Shahid</h1>

                <div className="box">
                    {/* Search */}
                    <button className="hide-in-large" onClick={() => openWindow("search")}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
                    </button>

                    {/* small media */}
                    <div className="hide-in-large">
                        <button onClick={() => toggleWindow(!isOpen, "userNavList")} className="icon" style={{ width: "40px" }}>
                            <FontAwesomeIcon icon={faBars} size="xl" />
                        </button>
                    </div>

                    {/* large media */}
                    <div className="hide-in-small">
                        <NavBar className="text-center" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
