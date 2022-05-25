import {FC} from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigateStateObject } from './interfaces';

const CreateIssue:FC<{}> = ({}) => {    
    const state:useNavigateStateObject = useLocation().state as useNavigateStateObject;    

    return (
        <>
            <div>Creating issue at {state.address}</div>
        </>
    )
}

export default CreateIssue