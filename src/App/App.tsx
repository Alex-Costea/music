import './App.css'
import '../AlbumTile/AlbumTile'
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../Home/Home.tsx";
import Album from "../Album/Album.tsx";
import { MetadataContext } from '../MetadataContext/MetadataContext.tsx';
import {PlayerContext} from "../PlayerContext/PlayerContext.tsx";

export interface TrackMetadata {
    track : bigint,
    title: string,
    folder : string,
    trackDisplayed? : number
}

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
    nrTracks : bigint
    tracks : TrackMetadata[]
}

export interface Metadata{
    albums : AlbumMetadata[],
    cdnLink : string,
    artistName : string,
}

export interface PlayerData{
    playingTrack : string | null
    setPlayingTrack : (playingTrack : string | null) => void
}

function App() {
    const [metadata, setMetadata] = useState<Metadata>()
    const [playingTrack, setPlayingTrack] = useState<string | null>(null)

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
        <PlayerContext.Provider value={{playingTrack, setPlayingTrack}}>
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
