import { FC, useState, useMemo } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
  import { Selected,PlacesAutoCompleteProps } from './interfaces';



const PlacesAutocomplete: FC<PlacesAutoCompleteProps> = ({setSelected,setMapCenter}) => {
    const {
        ready,
        value,
        setValue,
        suggestions: {status,data},
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address:string) => {
        setValue(address,false);
        clearSuggestions();

        const results = await getGeocode({address});
        const {lat,lng} = getLatLng(results[0]);
        setMapCenter({lat,lng});
    }


    return (
        <Combobox onSelect={handleSelect}>
        <ComboboxInput 
        value={value} 
        onChange={(e: { target: { value: string; }; })=>setValue(e.target.value)} 
        disabled={!ready}
        className="w-full h-full p-2 text-gray-400" placeholder="search an address.."
        />
        <ComboboxPopover>
        <ComboboxList>
        {status === "OK" && data.map(({place_id,description}) => 
        (<ComboboxOption key={place_id} value={description}/>))}
        </ComboboxList>
        </ComboboxPopover>
        </Combobox>
    )   
}

export default PlacesAutocomplete;