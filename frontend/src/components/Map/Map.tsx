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


type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
type Selected = google.maps.LatLng | google.maps.LatLngLiteral;

const libraries: Libraries = ['places'];

const MapWrapper:FC<{apiKey:string}> = ({apiKey}) => {

    const [selected,setSelected] = useState<Selected>();  
    const [mapCenter,setMapCenter] = useState<google.maps.LatLng | google.maps.LatLngLiteral | undefined>({lat:47.3769,lng:8.5417});
    
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    })

    if (!isLoaded) return <div>Loading...</div>

    return(
        <>
            <div className='absolute top-8 left-1/2 translate-x-[-50%] z-10 w-[400px]'>
                <PlacesAutocomplete setSelected={setSelected} setMapCenter={setMapCenter}/>
            </div>     

            {selected!==undefined? 
                <Map selected={selected} mapCenter={mapCenter} />  
                :
                <Map mapCenter={mapCenter}/>  
            }
            
        </>
    )
}

export default MapWrapper;

const Map:FC<{selected?:Selected, mapCenter:google.maps.LatLng | google.maps.LatLngLiteral | undefined}> = ({selected,mapCenter}) => {     

    

    return (            

        <GoogleMap 
            zoom={13}
            center={mapCenter} 
            mapContainerClassName="h-full w-full"
        >               
            {/*selected && <Marker position={selected}/>*/}           
                 
        </GoogleMap>       
       
    )
}

const PlacesAutocomplete: FC<{setSelected:React.Dispatch<React.SetStateAction<Selected | undefined>>,
                            setMapCenter:React.Dispatch<React.SetStateAction<google.maps.LatLng | google.maps.LatLngLiteral | undefined>>}> = ({setSelected,setMapCenter}) => {
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
        const {lat,lng} = getLatLng(results[0]);
        setMapCenter({lat,lng});
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

