import {useMemo, useState} from 'react';

import TextField from '@mui/joy/TextField';
import { IconButton } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';

import "./SearchField.css";

const SearchField = () => {
    const [bandName, setBandName] = useState('');

    const SearchButton = useMemo(() => {
        return (
            <IconButton color="primary" variant="soft" size="lg">
                <SearchIcon />
            </IconButton>
        );
    }, [])

    return (
        <div className="search-container">
                <TextField
                    className="search-container_input" 
                    color="primary" 
                    variant="plain" 
                    placeholder="Search music, based on band you like..."
                    size="lg"
                    value={bandName}
                    onChange={(e) => setBandName(e.target.value)}/>
                {SearchButton}
        </div>
    );
};

export default SearchField;