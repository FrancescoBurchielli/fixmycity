export type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
export type Selected = google.maps.LatLng | google.maps.LatLngLiteral;


export interface MapProps {
    selected?:Selected, 
    mapCenter:google.maps.LatLng | google.maps.LatLngLiteral | undefined
}


