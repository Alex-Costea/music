import "./Artist.css"

interface ArtistProps {
    artistName?: string | undefined
}

function Artist({artistName}: ArtistProps) {
    return <h1 className="artist">{artistName}</h1>
}

export default Artist