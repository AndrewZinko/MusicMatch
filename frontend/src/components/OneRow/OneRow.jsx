import { useSelector } from "react-redux";
import ArtistCard from "../ArtistCard/ArtistCard";
import MusicNotFound from "../MusicNotFound/MusicNotFound";

const OneRow = () => {
    const musicList = useSelector(state => state.music.musicList);
    const bandName = useSelector(state => state.music.query);

    const renderCardsWithOneRow = () => {
        if (musicList) {
            return musicList.map((item, index) => {
                if (!musicList[index][0]) {
                    return null;
                }
                return (
                    <div key={index} className="col-lg-6 padding">
                        <ArtistCard key={index} data={item} index={++index}/>
                    </div>
                );
            });
        }
        return <MusicNotFound bandName={bandName}/>;
    }

    return (
        <div className="row">
            {renderCardsWithOneRow()}
        </div>
    );
};

export default OneRow;