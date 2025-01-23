import {Link, useParams} from "react-router-dom";
import {MetadataContext} from "../MetadataContext/MetadataContext.tsx";
import {useContext, useEffect, useState} from "react";
import "./Album.css"

interface Track {
    url: string,
    filename : string
    number : number,
    title: string
}

function Album() {
    const {folder, trackID} = useParams()
    const metadata = useContext(MetadataContext)
    const album = metadata?.albums.filter(it => it.folder === folder)[0]
    const [tracks, setTracks] = useState<Track[]>([])

    useEffect(() =>
    {
        if(tracks.length == 0 && metadata)
        {
            const trackFilenames : string[] =
                Array.from(new Array(album?.nrTracks), (_, i ) => `${folder}${(i+1).toString()}`)
            function initTrack(url : string, filename: string, number : number, title : string)
            {
                return {
                    filename : filename,
                    url: url,
                    number : number,
                    title: title
                } as Track
            }
            let newTracks : Track[] = []
            const tracksMetadata = metadata.albums.filter(album => album.folder === folder)[0].tracks
            trackFilenames.forEach((fileName, i) => {
                const trackURL = `${metadata?.cdnLink}/mp3/${folder}/${fileName}.mp3`
                const title = tracksMetadata.filter(track =>
                    track.track.toString() === (i+1).toString())[0].title
                newTracks.push(initTrack(trackURL, fileName, i+1, title))
            })
            newTracks = newTracks.sort((a,b) => a.number - b.number)
            setTracks(newTracks)
        }
    }, [album?.nrTracks, folder, metadata, trackID, tracks])

    return <MetadataContext.Provider value={metadata}>
        <div className="AlbumPage">
            <div className="part1">
                <Link to={`/album/${album?.folder}`}>
                    <img
                        className="coverArt largeCoverArt"
                        alt={album?.title}
                        src={`${metadata?.cdnLink}/mp3/${folder}/cover-small.webp`} />
                    <h2 className={"albumName"}>{album?.title}</h2>
                    <h3 className={"subtitle"}>{album?.subtitle}</h3>
                </Link>

            </div>
            <ol className={"part2"}>
                {tracks.length > 0 && Array.from(
                    tracks.filter(id => trackID ? id.number.toString() === trackID.toString() : true),
                    (track, i) =>
                    <div key={i}>
                        <li><h3>
                            <span className={"trackNr"}>{trackID?'':`${track.number}. `}</span>
                            <Link to={`/album/${album?.folder}/${track.number}`}>
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