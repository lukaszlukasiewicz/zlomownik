import React, {useState} from 'react';

export const MapContext = React.createContext();

const MapProvider = ({children}) => {
  const [map,setMap] = useState(null);
  return <MapContext.Provider value={{get:map,set:setMap}}>{children}</MapContext.Provider>
}

export default MapProvider;

