import './App.css'
import '../AlbumTile/AlbumTile'
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../Home/Home.tsx";
import Album from "../Album/Album.tsx";
import Artist from "../Artist/Artist.tsx";
import { MetadataContext } from '../MetadataContext/MetadataContext.tsx';

export interface TrackMetadata {
    track : bigint,
    title: string,
    folder : string
}

export interface AlbumMetadata {
    title : string
    date: string
    folder : string
    subtitle : string
    titleHidden: boolean | undefined
    nrTracks : bigint,
    tracks : TrackMetadata[]
}

export interface Metadata{
    albums : AlbumMetadata[],
    cdnLink : string,
    artistName : string,
}

function App() {
    const [metadata, setMetadata] = useState<Metadata>()

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
        <Artist></Artist>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}></Route>
                <Route path={"/:currentAlbum"} element={<Album/>}></Route>
                <Route path={"/:currentAlbum/:currentTrack"} element={<Album/>}></Route>
            </Routes>
        </BrowserRouter>
    </MetadataContext.Provider>
  )
}

export default App
