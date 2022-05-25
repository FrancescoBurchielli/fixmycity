export type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
export type Selected = {'lat': number | undefined,
                        'lng': number | undefined,
                        'googleLatLng':google.maps.LatLng | google.maps.LatLngLiteral | undefined,
                        'address':String
                        };

export type MarkerObject={
            id:number,
            lat:number,
            lng:number,
            address:string,
            title:string,
            created:string,
            status: string,
            upvotes: number,
} 


export interface MapProps {
    map:google.maps.Map | undefined,
    setMap:React.Dispatch<React.SetStateAction<google.maps.Map | undefined>>,
    mapCenter:google.maps.LatLng | google.maps.LatLngLiteral | undefined,
    setMapCenter: React.Dispatch<React.SetStateAction<google.maps.LatLng | google.maps.LatLngLiteral | undefined>>,
    selected?:Selected, 
    setSelected: React.Dispatch<React.SetStateAction<Selected>>,  
}


