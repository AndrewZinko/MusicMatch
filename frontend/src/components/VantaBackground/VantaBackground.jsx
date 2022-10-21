import {useState, useEffect, useRef} from 'react';
import NET from "vanta/dist/vanta.net.min.js";

import './VantaBackground.css';

const MainPage = ({type}) => {
    const [vantaBackground, setVantaBackground] = useState(null);
    const refBackground = useRef(null);

    useEffect(() => {
        if (!vantaBackground) {
            setVantaBackground(NET({
                el: refBackground.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                color: type === "Main" ? 0x2d6889 : 0xff0057,
                backgroundColor: type === "Main" ? 0x23153c : 0x9061b
            }));
        }

        return () => {
            if (vantaBackground) {
                vantaBackground.destroy();
            }
        }
    }, [vantaBackground]);

    const fixPosition = (typeOfBackground) => {
        return typeOfBackground === "Search" ? {"position": "fixed"} : null;
    }

    return (
        <div className="vanta-background" ref={refBackground} style={fixPosition(type)}/>
    );
};

export default MainPage;