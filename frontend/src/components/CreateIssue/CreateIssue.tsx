import {FC} from 'react'
import { useLocation } from 'react-router-dom'

const CreateIssue:FC<{}> = ({}) => {    
    const location = useLocation();    

    console.log(location);

    return (
        <>
            <div>I'll be your create issue component</div>
        </>
    )
}

export default CreateIssue