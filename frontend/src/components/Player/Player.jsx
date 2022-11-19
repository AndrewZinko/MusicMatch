import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { usePlayer } from "../../hooks/player.hook";

import DCMAButton from "../DCMAButton/DCMAButton";

import IconButton from "@mui/joy/IconButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CircularProgress from "@mui/joy/CircularProgress";

import "./Player.css";

const Player = () => {
    const {togglePlayPause, fetchTrackUrl, markTrackAsUnplayable} = usePlayer();

    const trackData = useSelector(state => state.player.trackData);
    const trackUrl = useSelector(state => state.player.trackUrl);
    const playStatus = useSelector(state => state.player.playStatus);
    const trackUrlLoadingStatus = useSelector(state => state.player.trackUrlLoadingStatus);

    const audioPlayer = useRef();
    const progressBar = useRef();

    let animationFrame = null;

    useEffect(() => {
        if (trackData?.band && trackData?.name) {
            progressBar.current.max = Math.floor(trackData.duration);

            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: trackData.name,
                    artist: trackData.band
                });
            }

            fetchTrackUrl(trackData?.band, trackData?.name);
        }
    }, [trackData?.id]);

    const onPlayPauseClick = async () => {
        const prevValue = playStatus;

        if (!prevValue) {
            try {
                await audioPlayer.current.play();
                animationFrame = requestAnimationFrame(whilePlaying);
            } catch (e) {
                markTrackAsUnplayable();
            }
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationFrame);
        }

        togglePlayPause(playStatus);
    }

    const changeRange = () => {
        if (audioPlayer.current) {
            audioPlayer.current.currentTime = progressBar.current.value;
        }
    }

    const whilePlaying = () => {
        if (audioPlayer.current) {
            progressBar.current.value = audioPlayer.current.currentTime;
            animationFrame = requestAnimationFrame(whilePlaying);
        }
    }

    const renderPlayButton = () => {
        if (trackUrlLoadingStatus === "loading") {
            return <CircularProgress color="info" variant="plain" />
        } else if (trackUrlLoadingStatus === "unplayable") {
            return <DCMAButton/>;
        }

        return (
            <IconButton className="track_time-play_iconbutton" onClick={onPlayPauseClick}>
                {!playStatus ? <PlayArrowIcon style={{"fill": "#211f27"}}/> : <PauseIcon style={{"fill": "#211f27"}}/>}
            </IconButton>
        );
    }

    return (
        <div className="player_wrapper">
            <audio src={trackUrl?.musicUrl} ref={audioPlayer}></audio>
            <div className="player_container">
                <img className="track_cover" style={{'margin': '0'}} src={trackData?.cover} alt="Track Cover" />
                <div className="track_initials">
                    <p className="track_name">{trackData?.name}</p>
                    <p className="track_band">{trackData?.band}</p>
                </div>
            </div>
            
            <div className="player_container">
                <input type="range" ref={progressBar} onChange={changeRange} className="player_input-range" defaultValue={0}/>
                {renderPlayButton()}
            </div>
        </div>
    );
};

export default Player;