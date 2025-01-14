import './App.css'
import '../AlbumTile/AlbumTile'
import AlbumTile from "../AlbumTile/AlbumTile.tsx";
import {useEffect, useState} from "react";

interface Album{
    title : string
    date: string
    folder : string
    subtitle : string
    imageFormat : string,
    titleHidden: boolean | undefined
}

interface Metadata{
    albums : Album[]
}

function App() {
    const [metadata, setMetadata] = useState<Metadata>()

    useEffect(() => {
        fetch("src/assets/metadata.json").then(res => res.json()).then( (res: Metadata) =>
        {
            res.albums = res.albums.sort((a, b) => {
                const dateA = Date.parse(a.date)
                const dateB = Date.parse(b.date)
                return dateB - dateA;
            })
            setMetadata(res)
        })
    }, [])

  return (
    <>
      <h1 className="artist">alco★</h1>
        <div className="tiles">
            {metadata?.albums && Array.from(metadata?.albums, (album) =>
                (
                    <AlbumTile
                        name={album.title}
                        folder={album.folder}
                        subname={album.subtitle}
                        imageFormat={album.imageFormat}
                        titleHidden={album.titleHidden}/>
                ))}
        </div>
    </>
  )
}

export default App
