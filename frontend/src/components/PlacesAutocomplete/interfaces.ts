import { Selected } from "../Map/interfaces";


export interface PlacesAutoCompleteProps {
    setSelected:React.Dispatch<React.SetStateAction<Selected>>,
    map:google.maps.Map,
   
}