import React from 'react';
import { Link } from "react-router-dom";

import Chip from '@mui/joy/Chip';
import PianoIcon from '@mui/icons-material/Piano';
import "./Header.css"

const Header = () => {
    return (
        <Link to="/">
            <div className="header-wrapper">
                <PianoIcon className="header-icon" style={{"fill": "#eaeaea"}}/>
                <h2>MusicMatch</h2>
                <Chip className="header__beta-chip" color="info" size="sm" variant="soft">Beta</Chip>
            </div>
        </Link>
    );
};

export default Header;