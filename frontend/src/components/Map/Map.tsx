import { FC, useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import PlacesAutocomplete from '../PlacesAutocomplete/PlacesAutocomplete';
import { MapProps, Libraries, Selected, MarkerObject } from "./interfaces";
import { useEffect } from 'react';
import { getAllIssues } from '../../axios/fetches';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const libraries: Libraries = ['places'];

const MapWrapper:FC<{apiKey:string}> = ({apiKey}) => {

    const navigate = useNavigate();

    const [map,setMap] = useState<google.maps.Map>();
    const [selected,setSelected] = useState<Selected>({lat:undefined,lng:undefined,address:'',googleLatLng:undefined});  
    const [mapCenter,setMapCenter] = useState<google.maps.LatLng | google.maps.LatLngLiteral | undefined>({lat:47.3769,lng:8.5417});      
    

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    })

    const reportOnClickHandler = () => {
        navigate("/createissue",{state:{address:selected.address,lat:selected.lat,lng:selected.lng}});
    }


    if (!isLoaded) return <div>Loading...</div>

    return(
        <>            
            {map &&
            <div className='absolute top-[5%] left-1/2 translate-x-[-50%] z-10 w-[90%] md:w-[50%] lg:w-[30%]'>
                <PlacesAutocomplete setSelected={setSelected} map={map}/>
            </div>    
            }          
            {
            selected.address &&
            <button className='absolute bottom-10 left-1/2 translate-x-[-50%] z-10 w-[150px] h-[30px] md:w-[200px] md:h-[40px]  bg-white' onClick={reportOnClickHandler}>
                Report
            </button>  

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
                    if(map && e.latLng!==null){                        
                        const address = await getAddressFromLatLng(e.latLng);
                        const currentZoom = map.getZoom();
                        if(currentZoom!==undefined && currentZoom<16){
                            map.setZoom(16);   
                            map.setCenter(e.latLng);                             
                        }else{
                            setSelected({lat:e.latLng.lat(),lng:e.latLng.lng(),googleLatLng:e.latLng,address:address});
                        }                    
                    }            
            }}
            
        >               
            {selected?.googleLatLng && 
            <Marker position={selected.googleLatLng} onClick={()=>{setSelected({lat:undefined,lng:undefined,googleLatLng:undefined,address:''})}}/>}           
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
                <div className='Blabla w-24 md:w-36 lg:w-52 flex flex-col'>
                    <p className='text-base md:text-lg lg:text-xl font-bold '>{activeMarker.title}</p>
                    <p>{activeMarker.created}</p>
                    <p>{activeMarker.status}</p>
                    <p>{activeMarker.upvotes}</p>
                    <div className='flex flex-row justify-end'>
                        <Link to={`issuedetails/${activeMarker.id}`} className=''>More details</Link>
                    </div>
                   
                </div>
                </InfoWindow>
            
                )
                
            }


        </GoogleMap>       
       
    )
}



