import {Link} from "react-router-dom";
import {AlbumMetadata, Track} from "../App/App.tsx";
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import "./Track.css"
import {useContext} from "react";
import {PlayerContext} from "../PlayerContext/PlayerContext.tsx";

interface TrackProps{
    album? : AlbumMetadata
    track : Track
    isCurrentTrack : boolean
    albumTracks : Track[]
}

function TrackElement({track, album, isCurrentTrack, albumTracks} : TrackProps)
{
    const playerData = useContext(PlayerContext)!
    const trackList = playerData?.trackList
    const setTrackList = playerData?.setTrackList
    const {load, play, playing} = useGlobalAudioPlayer()

    function playTrack(currentTrack : Track, autoPlayNext : boolean)
    {
        let newTrackList = autoPlayNext ?
            albumTracks?.filter((albumTrack) => albumTrack.number >= currentTrack.number) :
            [currentTrack]
        setTrackList(newTrackList)
        load(currentTrack.url, {autoplay: true, onend : () => {
            if(newTrackList?.length > 1)
            {
                newTrackList = newTrackList.slice(1)
                setTrackList(newTrackList)
                playTrack(newTrackList[0], true)
            }
        }})
    }

    function onPlay() {
        if(!trackList || (trackList?.length > 0 && trackList[0].folder !== track.folder))
        {
            playTrack(track, !isCurrentTrack)
        }
        else if(!playing) {
            play()
        }
    }

    return <div className={"trackDiv"}>
        <li>
            <h3 className={"trackDivContents"}>
                            <span className={"trackNr"}>
                                {isCurrentTrack?'':`${track.numberDisplayed ?? track.number}. `}
                            </span>
            <span onClick={onPlay} className={"trackTitle"} data-title-hidden={album?.titleHidden && !isCurrentTrack}>
                {track.title}
            </span>
            <span className={"trackDivSpan"}>
                {
                    !isCurrentTrack &&
                    <Link to={`/${album?.folder}/${track.folder}`} className={"goToTrack"} >
                        <svg className={"goToTrackArrow"} fill="white" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                            <path d="M128,24A104,104,0,1,0,232,128,104.12041,104.12041,0,0,0,128,24Zm47.38477,107.05469a7.99866,7.99866,0,0,1-1.73829,2.61133l-33.92773,33.92773a7.99915,7.99915,0,0,1-11.3125-11.3125L148.6875,136H88a8,8,0,0,1,0-16h60.6875L128.40625,99.71875a7.99915,7.99915,0,0,1,11.3125-11.3125L173.64648,122.334a8.02367,8.02367,0,0,1,1.73829,8.72071Z"/>
                        </svg>
                    </Link>
                }
            </span>
        </h3>
        </li>
    </div>
}

export default TrackElement