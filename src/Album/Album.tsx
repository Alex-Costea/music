import {Link, useParams} from "react-router-dom";
import {MetadataContext} from "../MetadataContext/MetadataContext.tsx";
import {useContext, useEffect, useState} from "react";
import "./Album.css"

interface Track {
    url: string,
    filename : string
    number : number,
    title: string,
    folder : string
}

function initTrack(url : string, filename: string, number : number, title : string, folder: string)
{
    return {
        filename : filename,
        url: url,
        number : number,
        title: title,
        folder : folder
    } as Track
}

function Album() {
    const {currentAlbum, currentTrack} = useParams()
    const metadata = useContext(MetadataContext)
    const album = metadata?.albums.filter(it => it.folder === currentAlbum)[0]
    const [tracks, setTracks] = useState<Track[]>([])

    useEffect(() =>
    {
        if(tracks.length == 0 && metadata)
        {
            const trackFilenames : string[] =
                Array.from(new Array(album?.nrTracks), (_, i ) => `${currentAlbum}${(i+1).toString()}`)
            let newTracks : Track[] = []
            const tracksMetadata = metadata.albums.filter(album => album.folder === currentAlbum)[0].tracks
            trackFilenames.forEach((fileName, i) => {
                const trackURL = `${metadata?.cdnLink}/mp3/${currentAlbum}/${fileName}.mp3`
                const track = tracksMetadata.filter(track =>
                    track.track.toString() === (i+1).toString())[0]
                newTracks.push(initTrack(trackURL, fileName, i+1, track.title, track.folder))
            })
            newTracks = newTracks.sort((a,b) => a.number - b.number)
            setTracks(newTracks)
        }
    }, [album?.nrTracks, currentAlbum, metadata, currentTrack, tracks])

    return <MetadataContext.Provider value={metadata}>
        <div className="AlbumPage">
            <div className="part1">
                <Link to={`/${album?.folder}`}>
                    <img
                        className="coverArt largeCoverArt"
                        alt={album?.title}
                        src={`${metadata?.cdnLink}/mp3/${currentAlbum}/cover-small.webp`} />
                    <h2 className={"albumName"}>{album?.title}</h2>
                    <h3 className={"subtitle"}>{album?.subtitle}</h3>
                </Link>

            </div>
            <ol className={"part2"}>
                {tracks.length > 0 && Array.from(
                    tracks.filter(id => currentTrack ? id.folder === currentTrack: true),
                    (track, i) =>
                    <div key={i}>
                        <li><h3>
                            <span className={"trackNr"}>{currentTrack?'':`${track.number}. `}</span>
                            <Link to={`/${album?.folder}/${track.folder}`}>
                                {track.title}
                            </Link>
                        </h3></li>
                        <audio controls src={track.url}></audio>
                    </div>
                )}
            </ol>
        </div>
    </MetadataContext.Provider>
}

export default Album