import './App.css'
import '../AlbumTile/AlbumTile'
import AlbumTile from "../AlbumTile/AlbumTile.tsx";
import {useEffect, useState} from "react";

interface Album{
    title : string
    date: string
    folder : string
    subtitle : string
    titleHidden: boolean | undefined
}

interface Metadata{
    albums : Album[],
    cdnLink : string,
    artistName : string
}

function App() {
    const [metadata, setMetadata] = useState<Metadata>()

    useEffect(() => {
        fetch("metadata.json").then(res => res.json()).then( (res: Metadata) =>
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
    <>
      <h1 className="artist">{metadata?.artistName}</h1>
        <div className="tiles">
            {metadata?.albums && Array.from(metadata?.albums, (album) =>
                (
                    <AlbumTile
                        name={album.title}
                        key={album.folder}
                        folder={album.folder}
                        subname={album.subtitle}
                        titleHidden={album.titleHidden}
                        cdnLink={metadata.cdnLink}/>
                ))}
        </div>
    </>
  )
}

export default App
