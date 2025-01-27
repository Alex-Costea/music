import "./Player.css"
import {useGlobalAudioPlayer} from "react-use-audio-player";
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import {useContext} from "react";
import {PlayerContext} from "../PlayerContext/PlayerContext.tsx";

function Player()
{
    const {pause, play, playing} = useGlobalAudioPlayer()
    const playerData = useContext(PlayerContext)!
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

    return <Draggable bounds={"html"}
                      defaultPosition={coordinates ?? undefined}
                      cancel={'.need-interaction'}
                      onDrag={onDrag}
                      >
        <div className={"player"}>
            <button onClick={onPlay} className={"controlButton need-interaction"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                     className="bi bi-play-fill" viewBox="0 0 16 16">
                    <path
                        d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                </svg>
            </button>
            <button onClick={onPause} className={"controlButton need-interaction"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                     className="bi bi-pause-fill" viewBox="0 0 16 16">
                    <path
                        d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                </svg>
            </button>
        </div>
    </Draggable>
}

export default Player