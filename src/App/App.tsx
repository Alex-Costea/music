import './App.css'
import '../AlbumTile/AlbumTile'
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../Home/Home.tsx";
import Album from "../Album/Album.tsx";
import { MetadataContext } from '../MetadataContext/MetadataContext.tsx';
import {PlayerContext} from "../PlayerContext/PlayerContext.tsx";

export interface AlbumMetadata {
    title : string
    date: string
    folder : string
    subtitle : string
    titleHidden?: boolean
    specialCover?: boolean
    specialBackground? : boolean
    hideTitleOnPage? : boolean
    noBorderOnCover? : boolean
    nrTracks : number
    tracks : Track[]
}

export interface Metadata{
    albums : AlbumMetadata[],
    cdnLink : string,
    artistName : string,
}

export interface Coordinates{
    x : number
    y : number
}

export interface Track {
    url: string,
    filename : string
    title: string,
    folder : string,
    numberDisplayed? : number
    track : number,
    trackDisplayed? : number
    featuring : string
}

export interface PlayerData{
    trackList : Track[] | null
    setTrackList : (playingTrack : Track[] | null) => void
    trackNr : number
    setTrackNr : (nr : number) => void
    playerCoordinates : Coordinates | null
    setPlayerCoordinates : (coordinates : Coordinates | null) => void
}

function App() {
    const [metadata, setMetadata] = useState<Metadata>()
    const [trackList, setTrackList] = useState<Track[] | null>(null)
    const [trackNr, setTrackNr] = useState<number>(0)
    const [playerCoordinates, setPlayerCoordinates] = useState<Coordinates | null>(null)

    useEffect(() => {
        fetch(window.location.origin + "/metadata.json").then(res => res.json()).then( (res: Metadata) =>
        {
            res.albums = res.albums.sort((a, b) => {
                const dateA = Date.parse(a.date)
                const dateB = Date.parse(b.date)
                return dateB - dateA;
            })
            setMetadata(res)
            document.title = `${res.artistName}`
        })
    }, [])

  return (
    <MetadataContext.Provider value={metadata ?? null}>
        <PlayerContext.Provider value={{
            trackList, setTrackList, trackNr, setTrackNr, playerCoordinates, setPlayerCoordinates}}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>}></Route>
                    <Route path={"/:currentAlbum"} element={<Album/>}></Route>
                    <Route path={"/:currentAlbum/:currentTrack"} element={<Album/>}></Route>
                </Routes>
            </BrowserRouter>
        </PlayerContext.Provider>
    </MetadataContext.Provider>
  )
}

export default App
