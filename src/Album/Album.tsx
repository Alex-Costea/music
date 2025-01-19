import {useParams} from "react-router-dom";

function Album() {
    const {name} = useParams()
    console.log(name)
    return <>
        <div>{name}</div>
    </>
}

export default Album