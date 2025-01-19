import {useParams} from "react-router-dom";
import { MetadataContext } from "../MetadataContext/MetadataContext.tsx";
import {useContext} from "react";

function Album() {
    const {name} = useParams()
    const metadata = useContext(MetadataContext)
    return <MetadataContext.Provider value={metadata}>
        <div>{name}</div>
    </MetadataContext.Provider>
}

export default Album