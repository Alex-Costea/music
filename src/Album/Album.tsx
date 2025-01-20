import {useParams} from "react-router-dom";
import {MetadataContext} from "../MetadataContext/MetadataContext.tsx";
import {useContext, useEffect, useState} from "react";
import {parseWebStream} from "music-metadata";

interface Track {
    url: string,
    filename : string
    number : number
}

async function getTitle(url : string)
{
    const response = await fetch(url)
    const body = response.body
    const metadata = await parseWebStream(body)
    return metadata.common.title
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
            const trackURLs: string[] = trackFilenames.map((_, i) =>
                `${metadata?.cdnLink}/mp3/${folder}/${folder}${(i+1).toString()}.mp3`)
            function initTrack(url : string, filename: string, number : number)
            {
                return {
                    filename : filename,
                    url: url,
                    number : number
                } as Track
            }
            const newTracks : Track[] = []
            trackFilenames.forEach((trackName, i) => {
                const trackURL = trackURLs[i]
                newTracks.push(initTrack(trackURL, trackName, i+1))
            })
            setTracks(newTracks.sort((a,b) => a.number - b.number))
            console.log(tracks)
        }
    }, [album?.nrTracks, folder, metadata, tracks])

    return <MetadataContext.Provider value={metadata}>
        <>
            {album &&
                <h2>{album.title}</h2>
            }
            {tracks.length > 0 && Array.from(tracks, (track, i) =>
                <div key={i}>
                    <h3>{track.filename}</h3>
                    <audio controls src={track.url}></audio>
                </div>
            )}
        </>
    </MetadataContext.Provider>
}

export default Album