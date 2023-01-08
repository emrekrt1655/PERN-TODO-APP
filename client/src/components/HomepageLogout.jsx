import React from 'react';
import { Link } from "react-router-dom"
import "./styles/homepagelogout.scss"
function HomepageLogout({ setHamburgerMenu }) {
    return (
        <div onClick={() => setHamburgerMenu(false)} className="containerLogout">

            <h1>
                Make some effort and be better
            </h1>
            <div className="info">
                <p>
                    Please

                    <Link to='/login'> login </Link>  now
                </p>
                <p>
                    If you already have not an account please <Link to='/register'>register </Link> now.
                </p>
            </div>
        </div>
    )
}

export default HomepageLogout