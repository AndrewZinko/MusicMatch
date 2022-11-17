import {useMemo} from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { useSelector } from 'react-redux';

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

    return (
        <CssVarsProvider>
            <div className="background" style={{"backgroundImage": `url(${background})`}}></div>
            <div className="result-page_container">
                <Header/>

                <h5 className="result-page_heading">
                    Search result on {bandName && `${bandName[0].toUpperCase()}${bandName.slice(1)}`}:
                </h5>

                {musicLoadingStatus === 'idle' ? renderWrapper : renderSpinner}
                {playerStatus === 'idle' ? <Player/> : null}
            </div>
        </CssVarsProvider>
    );
};

export default ResultPage;