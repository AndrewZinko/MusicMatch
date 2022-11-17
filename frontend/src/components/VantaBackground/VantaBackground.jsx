import {useState, useEffect, useRef} from 'react';
import NET from "vanta/dist/vanta.net.min.js";

import './VantaBackground.css';

const VantaBackground = () => {
    const [vantaBackground, setVantaBackground] = useState(null);
    const refBackground = useRef(null);

    useEffect(() => {
        if (!vantaBackground) {
            setVantaBackground(NET({
                el: refBackground.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                color: 0x5f35ae,
                backgroundColor: 0x101010
            }));
        }

        return () => {
            if (vantaBackground) {
                vantaBackground.destroy();
            }
        }
    }, [vantaBackground]);

    return (
        <div className="vanta-background" ref={refBackground}/>
    );
};

export default VantaBackground;