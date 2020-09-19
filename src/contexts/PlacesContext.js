import React, {useState, useEffect} from 'react';

import escapeRegex from 'utils/escapeRegex';


export const PlacesContext = React.createContext();

function matchSearchString(place,searchString) {
  const regexp = new RegExp(searchString, "i");
  const { name, address } = place;
  if(name.match(regexp)) return true; 
  if(address.match(regexp)) return true; 
  if(address.match(regexp)) return true; 
  return false;
}


const PlacesProvider = ({children}) => {

  const [places,setPlaces] = useState([]);
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/places`)
    .then(response =>  response.json())
    .then(places => {
      setPlaces(places.map(place => {
        place.visible = true;
        return place;
      }));
    });
  },[]);

  const filterPlaces = ({bounds,searchString, types} = {}) => {

    const cleansearchString = escapeRegex(searchString);
    setQueryString(searchString);
    const filtered = places.map(place => {
      const matchesString = matchSearchString(place, cleansearchString);
      const matchesType = types ? types.includes(place.type) : true;
      const visible = matchesString && matchesType;
      return Object.assign({},place, {visible});
    })
    setPlaces(filtered);
  }

  return <PlacesContext.Provider value={{
    list:places,
    filter:filterPlaces,
    searchString:queryString,
  }}>{children}</PlacesContext.Provider>
}

export default PlacesProvider;