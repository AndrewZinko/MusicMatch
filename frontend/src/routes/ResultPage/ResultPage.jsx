import {useEffect, useMemo} from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { fetchMusic } from "../../reducers/music";

import Header from '../../components/Header/Header';
import Player from '../../components/Player/Player';
import OneRow from "../../components/OneRow/OneRow";
import TwoRows from "../../components/TwoRows/TwoRows";

import CircularProgress from "@mui/joy/CircularProgress";
import background from "../../resources/search-page_bg.jpg";
import "./ResultPage.css";

const ResultPage = () => {
    const bandName = useSelector(state => state.music.query);
    const playerStatus = useSelector(state => state.player.playerStatus);
    const musicLoadingStatus = useSelector(state => state.music.musicLoadingStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        const data = {
            query: bandName ? bandName : localStorage.getItem("band")
        };

        dispatch(fetchMusic(data));
    }, []);

    const renderWrapper = useMemo(() => {
        return window.innerWidth < 800 ? <OneRow/> : <TwoRows/>;
    }, []);

    const renderSpinner = useMemo(() => {
        return (
            <div className="result-page_spinner">
                <CircularProgress color="info" variant="plain" />
            </div>
        );
    }, []);

    const displayBandName = (name) => {
        return `${name[0].toUpperCase()}${name.slice(1)}`
    }

    return (
        <CssVarsProvider>
            <div className="background" style={{"backgroundImage": `url(${background})`}}></div>
            <div className="result-page_container">
                <Header/>

                <h5 className="result-page_heading">
                    Search result on {bandName ? displayBandName(bandName) : displayBandName(localStorage.getItem("band"))}:
                </h5>

                {musicLoadingStatus === 'idle' ? renderWrapper : renderSpinner}
                {playerStatus === 'idle' ? <Player/> : null}
            </div>
        </CssVarsProvider>
    );
};

export default ResultPage;