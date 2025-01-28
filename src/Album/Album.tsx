import {useParams} from "react-router-dom";
import {MetadataContext} from "../MetadataContext/MetadataContext.tsx";
import {useContext} from "react";
import "./Album.css"
import TrackElement from "../TrackElement/TrackElement.tsx";
import AlbumInfo from "../AlbumInfo/AlbumInfo.tsx";
import Artist from "../Artist/Artist.tsx";
import Player from "../Player/Player.tsx";

function Album() {
    const {currentAlbum, currentTrack} = useParams()
    const metadata = useContext(MetadataContext)
    const album = metadata?.albums.filter(it => it.folder === currentAlbum)[0]
    const tracks = album?.tracks

    return <MetadataContext.Provider value={metadata}>
        <Artist></Artist>
        <div className="AlbumPage">
            {
                album?.specialBackground &&
                <style>{ `
                body{
                    background-image: url("${metadata?.cdnLink}/mp3/${currentAlbum}/background.webp");
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center center;
                }
            ` }</style>
            }
            <AlbumInfo album={album}></AlbumInfo>

            {
                tracks &&
                <ol className={"tracklistPanel"}>
                    {tracks.length > 0 && Array.from(
                        tracks.filter(id => currentTrack ? id.folder === currentTrack: true),
                        (track, i) =>
                            <TrackElement key={i} track={track} album={album} isCurrentTrack={Boolean(currentTrack)}
                                          albumTracks={tracks}/>
                    )}
                </ol>
            }

        </div>
        <Player></Player>
    </MetadataContext.Provider>
}

export default Album