import React, { useContext } from "react";
import styles from "./Map.module.scss";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { PlacesContext } from "contexts/PlacesContext";
import { MapContext } from "contexts/MapContext";
import { types } from "config/placeTypes";

const libraries = ["geometry"];

const Markers = () => {
  const places = useContext(PlacesContext);
  const map = useContext(MapContext);
  if (map.get()) {
    console.log(map.get().getBounds());
  }
  return places.list
    .filter((place) => place.visible)
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
  const typePosition =
    (window.google && window.google.maps.ControlPosition.TOP_CENTER) || null;
  const { set } = useContext(MapContext);

  return (
    <div className={`${styles.Map} ${props.className}`}>
      {props.children}
      <LoadScript
        libraries={libraries}
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
      >
        <GoogleMap
          mapContainerStyle={{ height: "100%" }}
          center={{ lat: 51, lng: 13 }}
          zoom={10}
          onLoad={(map) => {
            set(map);
            console.log(props);
          }}
          options={{
            streetViewControl: false,
            zoomControlOptions: { position: zoomPosition },
            mapTypeControlOptions: { position: typePosition },
          }}
        >
          <Markers />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default React.memo(Map);
