import { FC, useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import PlacesAutocomplete from '../PlacesAutocomplete/PlacesAutocomplete';
import { MapProps, Libraries, Selected, MarkerObject } from "./interfaces";
import { useEffect } from 'react';
import { getAllIssues } from '../../axios/fetches';
import { getLatLng } from 'use-places-autocomplete';

const libraries: Libraries = ['places'];

const MapWrapper:FC<{apiKey:string}> = ({apiKey}) => {

    const [map,setMap] = useState<google.maps.Map>();
    const [selected,setSelected] = useState<Selected>({latLng:null,address:''});  
    const [mapCenter,setMapCenter] = useState<google.maps.LatLng | google.maps.LatLngLiteral | undefined>({lat:47.3769,lng:8.5417});      
    

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    })

    if (!isLoaded) return <div>Loading...</div>

    return(
        <>
            {map!==undefined?
            <div className='absolute top-8 left-1/2 translate-x-[-50%] z-10 w-[90%] md:w-[50%] lg:w-[30%]'>
                <PlacesAutocomplete setSelected={setSelected} map={map}/>
            </div>     
            : null
            }          

            <Map selected={selected} setSelected={setSelected} mapCenter={mapCenter} setMapCenter={setMapCenter} map={map} setMap={setMap} />                
            
        </>
    )
}

export default MapWrapper;


const Map:FC<MapProps> = ({selected,setSelected,map,setMap,mapCenter,setMapCenter}) => {    
    
    const geocoder = new google.maps.Geocoder();
    const [markers,setMarkers] = useState<Array<MarkerObject>>([]);
    const [activeMarker,setActiveMarker] = useState<MarkerObject>();

    useEffect(()=>{
        getAllIssues(setMarkers);
    },[])

    const options = {
        disableDefaultUI:true,
    }



    const getAddressFromLatLng = async (latLng:google.maps.LatLng) => {
        const latLngInput = {'location':latLng};
        const response = await geocoder.geocode(latLngInput);
        return response.results[0].formatted_address;
    }

    const markerOnClick = (e:google.maps.MapMouseEvent,marker:MarkerObject) => {
        if(map!==undefined){
            setMapCenter({'lat':marker.lat,'lng':marker.lng});            
            map.setZoom(18);
            setActiveMarker(marker);
        }
      
    }

    console.log(selected);

    return (            

        <GoogleMap 
            zoom={13}
            center={mapCenter} 
            options={options}
            mapContainerClassName="h-full w-full"
            onLoad={map => {
                setMap(map);               
            }}
            onClick={async e=>{    
                    if(e.latLng!==null){                        
                        const address = await getAddressFromLatLng(e.latLng);
                        setSelected({latLng:e.latLng,address:address});                      
                    }            
            }}
            
        >               
            {selected?.latLng && <Marker position={selected.latLng} onClick={()=>{setSelected({latLng:null,address:''})}}/>}           
            {markers && 
            
                markers.map(marker => {
                    return (
                    <Marker
                        key={marker.id} 
                        position={marker} 
                        onClick={e => markerOnClick(e,marker)}
                    >
                   
                    </Marker> 
                    )
                    })           
            }

            {activeMarker && (              
                <InfoWindow
                    position={{
                        lat: activeMarker.lat + 0.0001,
                        lng: activeMarker.lng ,
                    }}
                    onCloseClick={()=>{
                        setActiveMarker(undefined);
                    }}
                >
                <div className='w-24 md:w-36 lg:w-52'>
                    <p className='text-base md:text-lg lg:text-xl font-bold '>{activeMarker.title}</p>
                    <p>{activeMarker.created}</p>
                    <p>{activeMarker.status}</p>
                    <p>{activeMarker.upvotes}</p>
                </div>
                </InfoWindow>
            
                )
                
            }


        </GoogleMap>       
       
    )
}



