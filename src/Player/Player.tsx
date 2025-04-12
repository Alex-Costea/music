import "./Player.css"
import {useGlobalAudioPlayer} from "react-use-audio-player";
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import {useContext} from "react";
import {PlayerContext} from "../PlayerContext/PlayerContext.tsx";
import * as React from "react";

function Player()
{
    const {pause, play, playing, isLoading, stop} = useGlobalAudioPlayer()
    const playerData = useContext(PlayerContext)!
    const trackList = playerData.trackList
    const setTrackList = playerData.setTrackList
    const setTrackNr = playerData.setTrackNr
    const trackNr = playerData.trackNr
    const coordinates = playerData.playerCoordinates
    const setCoordinates = playerData.setPlayerCoordinates
    const nodeRef = React.useRef(null);

    function onPlay() {
        if(!playing)
            play()
    }

    function onPause() {
        pause()
    }

    function onDrag(_e: DraggableEvent, data: DraggableData)
    {
        setCoordinates({x : data.x, y : data.y})
    }

    function closePlayer() {
        stop()
        setTrackList(null)
        setTrackNr(0)
        setCoordinates(null)
    }

    if(!trackList)
        return null

    return <Draggable bounds={"html"}
                      defaultPosition={coordinates ?? undefined}
                      cancel={'.need-interaction'}
                      onDrag={onDrag}
                      nodeRef={nodeRef}
                      >
        <div className={"player"} ref={nodeRef}>
            <div className={"songPlaying"}>
                {trackList.length > 0 ? trackList[trackNr ?? 0].title : "Nothing is playing"}
            </div>
            {isLoading &&
                <button className={"controlButton need-interaction"}>
                    <svg fill="white" width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
                </button>}

            {!playing && !isLoading &&
                <button onClick={onPlay} className={"controlButton need-interaction"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white"
                         className="bi bi-play-fill" viewBox="0 0 16 16">
                        <path
                            d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                </svg>
            </button>
            }

            {
                playing &&
                <button onClick={onPause} className={"controlButton need-interaction"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white"
                         className="bi bi-pause-fill" viewBox="0 0 16 16">
                        <path
                            d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                    </svg>
                </button>
            }

            <button className={"controlButton need-interaction"}>
                <svg fill="white" width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                    <g data-name="Layer 2">

                        <g data-name="expand">

                            <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>

                            <path d="M20 5a1 1 0 0 0-1-1h-5a1 1 0 0 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L18 7.42V10a1 1 0 0 0 1 1 1 1 0 0 0 1-1z"/>

                            <path d="M10.71 13.29a1 1 0 0 0-1.42 0L6 16.57V14a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2H7.42l3.29-3.29a1 1 0 0 0 0-1.42z"/>

                        </g>

                    </g>

                </svg>
            </button>

            <button className={"controlButton need-interaction closeButton"} onClick={closePlayer}>
                <svg fill="white" height="12" width="12" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                     viewBox="0 0 512 512" xmlSpace="preserve">
                    <g>
                        <g>
                            <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512
                                512,452.922 315.076,256 		"/>
                        </g>
                    </g>
                </svg>
            </button>

        </div>
    </Draggable>
}

export default Player