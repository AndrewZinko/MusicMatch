import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { useSelector } from 'react-redux';

import Header from '../../components/Header/Header';
import ArtistCard from '../../components/ArtistCard/ArtistCard';
import Player from '../../components/Player/Player';
import background from "../../resources/search-page_bg.jpg";
import "./ResultPage.css";

const ResultPage = () => {
    const bandName = useSelector(state => state.music.query);
    const musicList = useSelector(state => state.music.musicList);
    const playerStatus = useSelector(state => state.player.playerStatus);

    console.log('render');
    return (
        <CssVarsProvider>
            <div className="background" style={{"backgroundImage": `url(${background})`}}></div>
            <div className="result-page_container">
                <Header/>

                <h5 className="result-page_heading">
                    Search result on {bandName && `${bandName[0].toUpperCase()}${bandName.slice(1)}`}:
                </h5>

                <div className="wrapper">
                    {musicList.map((item, index) => {
                        return (
                            <div className="result-page_artist-card padding">
                                <ArtistCard data={item} index={++index}/>
                            </div>
                        );
                    })}
                </div>
                {playerStatus === 'idle' ? <Player/> : null}
            </div>
        </CssVarsProvider>
    );
};

export default ResultPage;