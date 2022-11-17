import { useMemo } from "react";
import { useSelector } from "react-redux";

import ArtistCard from "../ArtistCard/ArtistCard";
import MusicNotFound from "../MusicNotFound/MusicNotFound";

const TwoRows = () => {
    const bandName = useSelector(state => state.music.query);
    const musicList = useSelector(state => state.music.musicList);

    const renderFirstRow = () => {
        return musicList?.map((item, index) => {
            if (index % 2 !== 0 || !musicList[index][0]) {
                return null;
            }
            return (
                <div key={index} className="padding">
                    <ArtistCard key={index} data={item} index={++index}/>
                </div>
            );
        });
    }

    const renderSecondRow = () => {
        return musicList?.map((item, index) => {
            if (index % 2 === 0 || !musicList[index][0]) {
                return null;
            }
            return (
                <div key={index} className="padding">
                    <ArtistCard key={index} data={item} index={++index}/>
                </div>
            );
        });
    }

    const renderResult = useMemo(() => {
        return (
            <div className="row">
                <div className="col-lg-6">
                    {renderFirstRow()}
                </div>
                <div className="col-lg-6">
                    {renderSecondRow()}
                </div>
            </div>
        );
    }, [musicList]);
    
    return (
        <>
            {musicList ? renderResult : <MusicNotFound bandName={bandName}/>}
        </>
    );
};

export default TwoRows;