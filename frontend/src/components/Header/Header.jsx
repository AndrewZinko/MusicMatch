import React from 'react';
import { Link } from "react-router-dom";

import PianoIcon from '@mui/icons-material/Piano';
import "./Header.css"

const Header = () => {
    return (
        <Link to="/">
            <div className="header-wrapper">
                <PianoIcon className="header-icon" style={{"fill": "#eaeaea"}}/>
                <h2>MusicMatch</h2>
            </div>
        </Link>
    );
};

export default Header;