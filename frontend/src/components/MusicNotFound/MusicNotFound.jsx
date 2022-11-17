import { Link } from 'react-router-dom';
import Button from '@mui/joy/Button';

import "./MusicNotFound.css";

const MusicNotFound = ({bandName}) => {
    return (
        <div className="music-not-found__wrapper">
            <h3>Could not find any recommendation on {`${bandName[0].toUpperCase()}${bandName.slice(1)}`}</h3>
            <hr style={{"color": "#eaeaea"}}/>

            <p className='music-not-found__paragraph'>Check the spelling or try again later.</p>
            <p className='music-not-found__paragraph'>Also, your band might not be found in the database. If the spelling is correct, try another band.</p>
            
            <div className='music-not-found__button'>
                <Link className="music-not-found__link" to="/">
                    <Button color="info" variant="soft">Back to main menu</Button>
                </Link>
            </div>

        </div>
    );
};

export default MusicNotFound;