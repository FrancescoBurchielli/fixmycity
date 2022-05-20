import { FC, useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import PlacesAutocomplete from '../PlacesAutocomplete/PlacesAutocomplete';
import { MapProps, Libraries, Selected } from "./interfaces";


const libraries: Libraries = ['places'];

const MapWrapper:FC<{apiKey:string}> = ({apiKey}) => {

    const [selected,setSelected] = useState<Selected>(null);  
    const [mapCenter,setMapCenter] = useState<google.maps.LatLng | google.maps.LatLngLiteral | undefined>({lat:47.3769,lng:8.5417});
    const [map,setMap] = useState<google.maps.Map>();
    

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    })

    if (!isLoaded) return <div>Loading...</div>

    return(
        <>
            {map!==undefined?
            <div className='absolute top-8 left-1/2 translate-x-[-50%] z-10 w-[400px]'>
                <PlacesAutocomplete setSelected={setSelected} map={map}/>
            </div>     
            : null
            }          

            <Map selected={selected} setSelected={setSelected} mapCenter={mapCenter} setMap={setMap} />  
                
            
            
        </>
    )
}

export default MapWrapper;


const Map:FC<MapProps> = ({selected,setSelected,mapCenter,setMap}) => {       

    return (            

        <GoogleMap 
            zoom={13}
            center={mapCenter} 
            mapContainerClassName="h-full w-full"
            onLoad={map => {
                setMap(map);               
            }}
            onClick={e=>{
                    console.log(e);
                    setSelected(e.latLng);              
            }}
            
        >               
            {selected && <Marker position={selected} onClick={()=>{setSelected(null)}}/>}           
                 
        </GoogleMap>       
       
    )
}



