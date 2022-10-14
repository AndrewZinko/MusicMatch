import {useState, useEffect, useRef} from 'react';
import { CssVarsProvider } from '@mui/joy/styles';

import Header from '../../components/Header/Header';
import SearchField from "../../components/SearchField/SearchField";
import NET from "vanta/dist/vanta.net.min.js";

import './MainPage.css';

const MainPage = () => {
    const [vantaBackground, setVantaBackground] = useState(null);
    const refBackground = useRef(null);

    useEffect(() => {
        if (!vantaBackground) {
            setVantaBackground(NET({
                el: refBackground.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                color: 0x2d6889
            }));
        }

        return () => {
            if (vantaBackground) vantaBackground.destroy();
        }
    }, [vantaBackground]);

    return (
        <CssVarsProvider>
            <div className="vanta-background" ref={refBackground}/>
            <Header/>
            <SearchField/>
      </CssVarsProvider>
    );
};

export default MainPage;