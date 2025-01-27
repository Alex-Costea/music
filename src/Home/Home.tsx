import AlbumTile from "../AlbumTile/AlbumTile.tsx";
import {useContext} from "react";
import {MetadataContext} from "../MetadataContext/MetadataContext.tsx";
import Artist from "../Artist/Artist.tsx";
import Player from "../Player/Player.tsx";

function Home() {
    const metadata = useContext(MetadataContext)
    return <>
        <Artist></Artist>
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
        <Player></Player>
    </>
}

export default Home