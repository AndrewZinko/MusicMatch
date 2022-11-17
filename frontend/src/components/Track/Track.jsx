import { usePlayer } from '../../hooks/player.hook';
import { useSelector } from 'react-redux';

import IconButton from '@mui/joy/IconButton';
import Chip from '@mui/joy/Chip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "./Track.css";

const Track = ({id, number, cover, name, band, duration}) => {
    const {activatePlayer, togglePlayPause} = usePlayer();

    const handleTrack = () => {
        const playingNow = true;
        togglePlayPause(playingNow);
        activatePlayer(id, cover, name, band, duration);
    } 

    const renderTrackDuration = (duration) => {
        const min = Math.floor(duration / 60);
        const sec = duration % 60 < 10 ? `0${duration % 60}` : duration % 60;
        return (
            <p className="track_time-play_paragraph">
                {min}:{sec}
            </p>
        );
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
                    {renderTrackDuration(duration)}
                </Chip>
                <IconButton className="track_time-play_iconbutton" 
                    onClick={() => handleTrack()}>
                    <PlayArrowIcon style={{"fill": "#211f27"}}/>
                </IconButton>
            </div>

        </div>
    );
};

export default Track;