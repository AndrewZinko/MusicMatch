import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CssVarsProvider } from '@mui/joy/styles';
import { usePlayer } from '../../hooks/player.hook';
import { dropMusicList } from '../../reducers/music';

import Header from '../../components/Header/Header';
import SearchField from "../../components/SearchField/SearchField";
import VantaBackground from "../../components/VantaBackground/VantaBackground";
import Author from '../../components/Author/Author';

const MainPage = () => {
    const {dropAudioPlayer} = usePlayer();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(dropMusicList());
        dropAudioPlayer();
    }, [])

    return (
        <CssVarsProvider>
            <VantaBackground/>
            <Header/>
            <SearchField/>
            <Author/>
        </CssVarsProvider>
    );
};

export default MainPage;