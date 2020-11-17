import React, { useContext } from "react";
import styles from "./Map.module.scss";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { PlacesContext } from "contexts/PlacesContext";
import { MapContext } from "contexts/MapContext";
import { types } from "config/placeTypes";

const libraries = ["geometry"];

const Markers = () => {
  const places = useContext(PlacesContext);
  return places.list
    .filter((place) => place.visible && places.typeFilter.includes(place.type))
    .map((place) => {
      return types[place.type].getMarker({
        key: place.id,
        position: place.location,
      });
    });
};

const Map = (props) => {
  console.log("map render");
  const zoomPosition =
    (window.google && window.google.maps.ControlPosition.LEFT_BOTTOM) || null;
  const { set } = useContext(MapContext);

  return (
    <div className={`${styles.Map} ${props.className}`}>
      <LoadScript
        libraries={libraries}
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
      >
        <GoogleMap
          mapContainerStyle={{ height: "100%" }}
          center={{ lat: 51, lng: 13 }}
          zoom={10}
          onLoad={(map) => set(map)}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            zoomControlOptions: { position: zoomPosition },
            mapTypeControl: false,
          }}
        >
          {props.children}
          <Markers />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default React.memo(Map, () => true);
