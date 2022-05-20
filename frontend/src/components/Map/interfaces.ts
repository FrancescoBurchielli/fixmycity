export type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
export type Selected = google.maps.LatLng | google.maps.LatLngLiteral | null;


export interface MapProps {
    selected?:Selected, 
    mapCenter:google.maps.LatLng | google.maps.LatLngLiteral | undefined,
    setMap:React.Dispatch<React.SetStateAction<google.maps.Map | undefined>>,
    setSelected: React.Dispatch<React.SetStateAction<Selected>>,
}


