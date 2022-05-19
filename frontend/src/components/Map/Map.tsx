import { FC, useState, useMemo } from 'react';
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
import { ResultStorage } from 'firebase-functions/v1/testLab';


const MapWrapper:FC<{apiKey:string}> = ({apiKey}) => {

    const [selected,setSelected] = useState<google.maps.LatLng | google.maps.LatLngLiteral>();   

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries: ["places"],
    })

    if (!isLoaded) return <div>Loading...</div>

    return(
        <>
            <div className='absolute top-8 left-1/2 translate-x-[-50%] z-10 w-[400px]'>
                <PlacesAutocomplete setSelected={setSelected} />
            </div>            
                <Map selected={selected}/>             
            
        </>
    )
}

export default MapWrapper;

const Map:FC<{selected:google.maps.LatLng | google.maps.LatLngLiteral}> = ({selected}) => {     

    return (            

        <GoogleMap 
            zoom={13}
            center={{lat:47.3769,lng:8.5417}} 
            mapContainerClassName="h-full w-full"
        >               
            {/*selected && <Marker position={selected}/>*/}           
                 
        </GoogleMap>       
       
    )
}

const PlacesAutocomplete: FC<{setSelected:any}> = ({setSelected}) => {
    const {
        ready,
        value,
        setValue,
        suggestions: {status,data},
        clearSuggestions,
    } = usePlacesAutocomplete();
    
    const handleSelect = async (address:string) => {
        setValue(address,false);
        clearSuggestions();

        const results = await getGeocode({address});
        console.log(results);
        //const {lat,lng} = await getLatLng(results[0]);
        //setSelected({lat,lng});
    }

    
    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput 
                value={value} 
                onChange={(e: { target: { value: string; }; })=>setValue(e.target.value)} 
                disabled={!ready}
                className="w-full h-full p-2 text-gray-400" placeholder="search an address.."
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && data.map(({place_id,description}) => 
                        (<ComboboxOption key={place_id} value={description}/>))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>

    )   
}

