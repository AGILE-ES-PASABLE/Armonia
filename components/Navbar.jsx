import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link href="/">
                    <span className="navbar-brand">Armonia10</span>
                </Link>
            </div>
            <div className={`navbar-right ${isOpen ? "open" : ""}`}>
                <div className="navbar-toggle" onClick={toggleNavbar}>
                    <div className="toggle-icon"></div>
                    <div className="toggle-icon"></div>
                    <div className="toggle-icon"></div>
                </div>
                <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
                    <li>
                        <Link href="/enterprise">
                            <span className="navbar-link">Organization</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/survey">
                            <span className="navbar-link">Survey</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/reports">
                            <span className="navbar-link">Reports</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <style jsx>{`
                .navbar {
                    background-color: #4CAF50;
                    padding: 20px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                }

                .navbar-brand {
                    color: #fff;
                    font-size: 24px;
                    cursor: pointer;
                    font-weight: bold;
                    text-transform: uppercase;
                }

                .navbar-links {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    align-items: center;
                }

                .navbar-links li {
                    margin-right: 20px;
                }

                .navbar-links li:last-child {
                    margin-right: 0;
                }

                .navbar-link {
                    color: #fff;
                    cursor: pointer;
                    font-size: 18px;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .navbar-link:hover {
                    color: #ccc;
                }

                .navbar-toggle {
                    display: none;
                    flex-direction: column;
                    cursor: pointer;
                }

                .toggle-icon {
                    width: 25px;
                    height: 3px;
                    background-color: #fff;
                    margin: 3px 0;
                }

                @media only screen and (max-width: 768px) {
                    .navbar-links {
                        display: none;
                        flex-direction: column;
                        position: absolute;
                        top: 60px;
                        left: 0;
                        background-color: #333;
                        width: 100%;
                    }

                    .navbar-links.open {
                        display: flex;
                    }

                    .navbar-toggle {
                        display: flex;
                    }

                    .toggle-icon {
                        background-color: #fff;
                    }

                    .navbar-link {
                        font-size: 20px;
                        margin: 10px 0;
                    }
                }
            `}</style>
        </nav>
    );
};


export default Navbar;
