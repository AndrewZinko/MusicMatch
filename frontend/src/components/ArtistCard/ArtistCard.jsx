import React from 'react';
import Track from "../Track/Track";
import "./ArtistCard.css";

const ArtistCard = ({data, index}) => {

    const renderTracks = (data) => {
        return data.map((item, index) => {
            return <Track
                        key={item.id}
                        id={item.id}
                        number={index < 9 ? `0${++index}` : ++index}
                        cover={item.album.cover_small}
                        name={item.title}
                        band={item.artist.name}
                        duration={item.duration}
                        p={item.preview}/>;
        });
    }

    return (
        <div className="artist-card_wrapper">
            <h5 className="artist-card_heading">Recommendation #{index}: {data[0].artist.name}</h5>
            <div className="artist-card_tracklist">
                {renderTracks(data)}
            </div>
        </div>
    );
};

export default ArtistCard;