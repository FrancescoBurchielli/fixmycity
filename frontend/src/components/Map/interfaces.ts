export type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
export type Selected = {'latLng': google.maps.LatLng | google.maps.LatLngLiteral | null,
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


