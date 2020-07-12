import React, {useState} from 'react';

export const MapContext = React.createContext();

const MapProvider = ({children}) => {
  const [map,setMap] = useState(null);
  const [mapCenter,setMapCenter] = useState({ lat:51, lng:13 })
  const [mapZoom,setMapZoom] = useState(10);

  const instance = (instance) => {
    if(instance) setMap(instance);
    return instance || map;
  }

  const center = (center = undefined) => {
    if(!center) return mapCenter;
    if(JSON.stringify(center) !== JSON.stringify(mapCenter)) setMapCenter(center);
  }

  const zoom = (zoom = undefined) => {
    if(zoom) setMapZoom(zoom);
    return zoom || mapZoom;
  }

  return <MapContext.Provider value={{instance,center,zoom}}>{children}</MapContext.Provider>
}

export default MapProvider;

