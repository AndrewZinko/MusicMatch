import { useSelector, useDispatch } from "react-redux";
import { addTrackToPlayer, togglePlayStatus, fetchCurrentTrack, dropPlayer } from "../reducers/player";

export const usePlayer = () => {
    const dispatch = useDispatch();

    const activatePlayer = (id, cover, name, band, duration) => {
        const trackDataBody = {
            id,
            cover,
            name,
            band,
            duration
        };
        dispatch(addTrackToPlayer(trackDataBody));
    } 

    const togglePlayPause = (playStatus) => {
        dispatch(togglePlayStatus(!playStatus));
    }

    const fetchTrackUrl = (band, name) => {
        const query = `${band} - ${name}`;
        const body = {
            query
        };

        dispatch(fetchCurrentTrack(body));
    }

    const dropAudioPlayer = () => {
        dispatch(dropPlayer());
    }

    return {
        activatePlayer,
        togglePlayPause,
        fetchTrackUrl,
        dropAudioPlayer
    };
}