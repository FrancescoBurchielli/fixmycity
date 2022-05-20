import { FC, useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import PlacesAutocomplete from '../PlacesAutocomplete/PlacesAutocomplete';
import { MapProps, Libraries, Selected } from "./interfaces";


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


const Map:FC<MapProps> = ({selected,mapCenter}) => { 

    const [map,setMap] = useState<google.maps.Map>();

    if(map !== undefined){
        //map.panTo({lat:42.4534,lng:11.4237});
    }   

    return (            

        <GoogleMap 
            zoom={13}
            center={mapCenter} 
            mapContainerClassName="h-full w-full"
            onLoad={map => {
                setMap(map);               
            }}
        >               
            {/*selected && <Marker position={selected}/>*/}           
                 
        </GoogleMap>       
       
    )
}



