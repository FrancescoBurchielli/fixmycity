import { FC,useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";


const MapWrapper:FC<{apiKey:string}> = ({apiKey}) => {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: apiKey,
    })

    if (!isLoaded) return <div>Loading...</div>

    return(
        <Map/>
    )
}

export default MapWrapper;

const Map:FC<{}> = () => {  

    return (    
        <GoogleMap 
        zoom={13}
        center={{lat:47.3769,lng:8.5417}} 
        mapContainerClassName="h-full w-full"

        />
    )

}