import {FC} from 'react'

interface Avenger {
    name:string
}

interface AvengerProps{
    avengers : Avenger[];
}

const List: FC<AvengerProps> = ({avengers}: AvengerProps) => {
    return(
        <>
        <ul>
        {avengers.map(({name},index) => {
            return (
                <li key={index}>{name}</li>
            )
        })}
        </ul>      
        </>
    )
}

export default List;