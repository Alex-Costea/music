import "./Player.css"
import {useGlobalAudioPlayer} from "react-use-audio-player";
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import {useContext} from "react";
import {PlayerContext} from "../PlayerContext/PlayerContext.tsx";

function Player()
{
    const {pause, play, playing, isLoading} = useGlobalAudioPlayer()
    const playerData = useContext(PlayerContext)!
    const trackList = playerData.trackList
    const trackNr = playerData.trackNr
    const coordinates = playerData.playerCoordinates
    const setCoordinates = playerData.setPlayerCoordinates

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

    if(!trackList)
        return null

    return <Draggable bounds={"html"}
                      defaultPosition={coordinates ?? undefined}
                      cancel={'.need-interaction'}
                      onDrag={onDrag}
                      >
        <div className={"player"}>
            <div className={"songPlaying"}>
                {trackList ? trackList[trackNr ?? 0].title : "Nothing is playing"}
            </div>
            {isLoading &&
                <button className={"controlButton need-interaction"}>
                    <svg fill="currentColor" width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg>
                </button>}

            {!playing && !isLoading &&
                <button onClick={onPlay} className={"controlButton need-interaction"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                         className="bi bi-play-fill" viewBox="0 0 16 16">
                        <path
                            d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                </svg>
            </button>
            }

            {
                playing &&
                <button onClick={onPause} className={"controlButton need-interaction"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                         className="bi bi-pause-fill" viewBox="0 0 16 16">
                        <path
                            d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                    </svg>
                </button>
            }

        </div>
    </Draggable>
}

export default Player