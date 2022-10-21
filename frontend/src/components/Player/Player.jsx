import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentTrack } from "../../reducers/player";

import CircularProgress from "@mui/joy/CircularProgress";
import IconButton from "@mui/joy/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import "./Player.css";

const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const trackData = useSelector(state => state.player.trackData);
    const trackUrl = useSelector(state => state.player.trackUrl);
    const trackLoadingStatus = useSelector(state => state.player.trackLoadingStatus);

    const dispatch = useDispatch();
    const audioPlayer = useRef();
    const progressBar = useRef();

    let animationFrame = null;

    useEffect(() => {
        if (trackData?.band && trackData?.name) {
            const query = `${trackData.band} - ${trackData.name}`;
            progressBar.current.max = Math.floor(trackData.duration);
            fetchTrackUrl(query);
        }
    }, [trackData?.id]);

    const fetchTrackUrl = (query) => {
        const body = {
            query
        };

        dispatch(fetchCurrentTrack(body));
    };

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);

        if (!prevValue) {
            audioPlayer.current.play();
            animationFrame = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationFrame);
        }
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        animationFrame = requestAnimationFrame(whilePlaying);
    }

    return (
        <div className="player_wrapper">
            <audio src={trackUrl?.music_url} ref={audioPlayer}></audio>
            <img className="track_cover" style={{'margin': '0'}} src={trackData?.cover} alt="Track Cover" />
            <div className="track_initials">
                <p className="track_name">{trackData?.name}</p>
                <p className="track_band">{trackData?.band}</p>
            </div>
            
            <input type="range" ref={progressBar} onChange={changeRange} className="player_input-range" defaultValue={0}/>

            <IconButton className="track_time-play_iconbutton" onClick={togglePlayPause}>
                {!isPlaying ? <PlayArrowIcon style={{"fill": "#211f27"}}/> : <PauseIcon style={{"fill": "#211f27"}}/>}
            </IconButton>
        </div>
    );
};

export default Player;