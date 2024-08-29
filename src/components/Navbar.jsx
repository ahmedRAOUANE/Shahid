/* eslint-disable react/prop-types */
import { faCircleHalfStroke, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom"
import useModal from "../custom-hooks/useModal";

const NavBar = ({ className = "" }) => {
    // State to keep track of the current theme
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const { openWindow } = useModal();

    const links = [
        { name: "Home", path: "/" },
        { name: "Free", path: "/free" },
        { name: "TV Show", path: "/tv-show" },
        { name: "Movies", path: "/movies" },
        { name: "Explore", path: "/explore" },
    ];

    const switchTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme); // Persist theme choice in localStorage
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <div className={`box ${className}`}>
            <nav className="full-width">
                <ul className={`box full-width ${className}`} style={{ gap: "10px" }}>
                    {links.map((link, idx) => (
                        <li key={idx} className="full-width">
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `btn link full-width ${isActive ? "active" : ""}`
                                }

                                style={{ display: "block", minWidth: "100px" }}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Search */}
            <button className="hide-in-small" onClick={() => openWindow("search")}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>

            {/* Toggle Themes */}
            <button className={`box ${className.includes("column") ? "full-width" : ""}`} onClick={switchTheme}>
                <FontAwesomeIcon icon={faCircleHalfStroke} size="xl" />
                <div className="full-width hide-in-large">
                    Switch Theme
                </div>
            </button>

            <div className={`box ${className}`}>
                <Link to={"/Login"} className="btn full-width text-center success">Login</Link>
                <Link to={"/register"} className="btn full-width text-center">Register</Link>
            </div>
        </div>
    )
}

export default NavBar

