import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addTrackToPlayer } from '../../reducers/player';

import IconButton from '@mui/joy/IconButton';
import Chip from '@mui/joy/Chip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "./Track.css"

const Track = ({id, number, cover, name, band, duration}) => {
    const dispatch = useDispatch();
    const onPlayerActivate = (id, cover, name, band, duration) => {
        const trackData = {
            id,
            cover,
            name,
            band,
            duration
        }
        dispatch(addTrackToPlayer(trackData));
    }

    const renderTrackDuration = (duration) => {
        const min = Math.floor(duration / 60);
        const sec = duration % 60 < 10 ? `0${duration % 60}` : duration % 60;
        return `${min}:${sec}`;
    }

    return (
        <div className='track_wrapper'>
            <div className="track_info">
                <span className='track_number'>{number}</span>
                <img className="track_cover" src={cover} alt="Track Cover" />
                
                <div className="track_initials">
                    <p className="track_name">{name}</p>
                    <p className="track_band">{band}</p>
                </div>
            </div>

            <div className="track_time-play">
                <Chip variant="plain" size="sm">
                    <p className="track_time-play_paragraph">
                        {() => renderTrackDuration(duration)}
                    </p>
                </Chip>
                <IconButton className="track_time-play_iconbutton" 
                    onClick={() => onPlayerActivate(id, cover, name, band, duration)}>
                    <PlayArrowIcon style={{"fill": "#211f27"}}/>
                </IconButton>
            </div>

        </div>
    );
};

export default Track;