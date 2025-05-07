import AlbumTile from "../AlbumTile/AlbumTile.tsx";
import {useContext} from "react";
import {MetadataContext} from "../MetadataContext/MetadataContext.tsx";
import Artist from "../Artist/Artist.tsx";
import Player from "../Player/Player.tsx";
import "./Home.css"

function Home() {
    const metadata = useContext(MetadataContext)
    return <>
        <Artist></Artist>
        <div className="tiles">
            {metadata?.albums && Array.from(metadata?.albums.filter((it) => !it.hidden),
                (album) => (
                    <AlbumTile
                        name={album.title}
                        key={album.folder}
                        folder={album.folder}
                        subname={album.subtitle}
                        titleHidden={album.titleHidden}
                        cdnLink={metadata.cdnLink}/>
                ))}
        </div>
        <Player></Player>
        <a className="source" target="_blank"
           href={"https://github.com/Alex-Costea/music"}>source code.</a>
    </>
}

export default Home