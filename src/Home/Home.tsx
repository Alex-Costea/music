import AlbumTile from "../AlbumTile/AlbumTile.tsx";
import {Metadata} from "../App/App.tsx";

interface HomeProps {
    metadata?: Metadata
}

function Home({metadata}: HomeProps) {
    return <div className="tiles">
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
}

export default Home