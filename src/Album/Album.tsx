import {useParams} from "react-router-dom";
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
    const {folder} = useParams()
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
            const newTracks : Track[] = []
            const tracksMetadata = metadata.albums.filter(album => album.folder === folder)[0].tracks
            trackFilenames.forEach((fileName, i) => {
                const trackURL = `${metadata?.cdnLink}/mp3/${folder}/${fileName}.mp3`
                const title = tracksMetadata.filter(track =>
                    track.track.toString() === (i+1).toString())[0].title
                newTracks.push(initTrack(trackURL, fileName, i+1, title))
            })
            setTracks(newTracks.sort((a,b) => a.number - b.number))
        }
    }, [album?.nrTracks, folder, metadata, tracks])

    return <MetadataContext.Provider value={metadata}>
        <div className="AlbumPage">
            <div className="part1">
                <img
                    className="coverArt largeCoverArt"
                    alt={album?.title}
                    src={`${metadata?.cdnLink}/mp3/${folder}/cover-small.webp`} />
                {album &&
                    <>
                        <h2>{album.title}</h2>
                        <h3>{album.subtitle}</h3>
                    </>
                }
            </div>
            <ol className={"part2"}>
                {tracks.length > 0 && Array.from(tracks, (track, i) =>
                    <div key={i}>
                        <li><h3><span className={"trackNr"}>{track.number}. </span>{track.title}</h3></li>
                        <audio controls src={track.url}></audio>
                    </div>
                )}
            </ol>
        </div>
    </MetadataContext.Provider>
}

export default Album