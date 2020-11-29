import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
const libraries = ["geometry"];

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
      <LoadScript
        libraries={libraries}
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
      >
        {children}
      </LoadScript>
    </MapContext.Provider>
  );
};

export default MapProvider;
