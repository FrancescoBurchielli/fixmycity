import { FC, useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import PlacesAutocomplete from '../PlacesAutocomplete/PlacesAutocomplete';
import { MapProps, Libraries, Selected, MarkerObject } from "./interfaces";
import { useEffect } from 'react';
;

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
            <div className='absolute top-8 left-1/2 translate-x-[-50%] z-10 w-[400px]'>
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
        const sampleMarkers:Array<MarkerObject> = [
            {id:1,lat:47.3769,lng:8.5417,address:'sample address'},
            {id:2,lat:47.3539,lng:8.5417,address:'sample address'},
            {id:3,lat:47.39,lng:8.539,address:'sample address'},
            {id:4,lat:47.38,lng:8.51,address:'sample address'},
        ];
        setTimeout(()=>setMarkers([...sampleMarkers]),2000)
    },[])

        
    const getAddressFromLatLng = async (latLng:google.maps.LatLng) => {
        const latLngInput = {'location':latLng};
        const response = await geocoder.geocode(latLngInput);
        return response.results[0].formatted_address;
    }

    const markerOnClick = (e:google.maps.MapMouseEvent,marker:MarkerObject) => {
        if(map!==undefined){
            setMapCenter({'lat':marker.lat,'lng':marker.lng});            
            setActiveMarker(marker);
            map.setZoom(18);
        }
      
    }

    return (            

        <GoogleMap 
            zoom={13}
            center={mapCenter} 
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
                        lat: activeMarker.lat,
                        lng: activeMarker.lng,
                    }}
                    onCloseClick={()=>{
                        setActiveMarker(undefined);
                    }}
                >
                <div>Test</div>
                </InfoWindow>
            
                )
                
            }


        </GoogleMap>       
       
    )
}



