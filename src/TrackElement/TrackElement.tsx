import {Link} from "react-router-dom";
import {Track} from "../Album/Album.tsx";
import {AlbumMetadata} from "../App/App.tsx";

interface TrackProps{
    album? : AlbumMetadata
    track : Track
    isCurrentTrack : boolean
}

function TrackElement({track, album, isCurrentTrack} : TrackProps)
{
    return <div className={"trackDiv"}>
        <li><h3>
                            <span className={"trackNr"}>
                                {isCurrentTrack?'':`${track.numberDisplayed ?? track.number}. `}
                            </span>
            <Link to={`/${album?.folder}/${track.folder}`} data-title-hidden={album?.titleHidden}>
                {track.title}
            </Link>
        </h3></li>
        <audio controls src={track.url}></audio>
    </div>
}

export default TrackElement