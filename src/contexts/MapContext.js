import React, { useState } from "react";

export const MapContext = React.createContext();

const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null);

  const set = (map) => {
    setMap(map);
  };

  const get = () => {
    return map;
  };

  const center = (center = undefined) => {
    if (!map) return false;
    if (!center) return map.getCenter();
    map.setCenter(center);
  };

  const zoom = (zoom = undefined) => {
    if (!map) return false;
    if (!zoom) return map.getZoom();
    map.setZoom(zoom);
  };

  return (
    <MapContext.Provider value={{ get, set, center, zoom }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
