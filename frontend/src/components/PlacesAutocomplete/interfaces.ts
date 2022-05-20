export type Selected = google.maps.LatLng | google.maps.LatLngLiteral;


export interface PlacesAutoCompleteProps {
    setSelected:React.Dispatch<React.SetStateAction<Selected | undefined>>,
    setMapCenter:React.Dispatch<React.SetStateAction<google.maps.LatLng | google.maps.LatLngLiteral | undefined>>
}