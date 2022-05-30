import {FC} from 'react'
import { useParams } from 'react-router-dom';


const IssueDetails:FC<{}> = ({}) => {

    const {id} = useParams();

    return (
        <div>Issue details for issue #{id}</div>
    )
}
export default IssueDetails;