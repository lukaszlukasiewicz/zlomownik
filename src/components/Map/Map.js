import React, { useContext } from "react";
import styles from "./Map.module.scss";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { PlacesContext } from "contexts/PlacesContext";
import { MapContext } from "contexts/MapContext";
import { types } from "config/placeTypes";
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import Marker from "components/Marker/Marker";

const libraries = ["geometry"];

const Markers = () => {
  const history = useHistory();
  const places = useContext(PlacesContext);
  return places.list
    .filter((place) => place.visible && places.typeFilter.includes(place.type))
    .map((place) => {
      return types[place.type].getMarker({
        key: place.id,
        position: place.location,
        onClick: (e) => {
          history.push(`/place/${place.id}/`);
        },
      });
    });
};

const PlaceMarker = (props) => {
  const { list } = useContext(PlacesContext);
  const { get, center, zoom } = useContext(MapContext);
  const { id } = useParams();
  const place = list.find((place) => place.id === id);
  if (!place) return false;
  center(place.location);
  zoom(15);

  if (get() && place.points) {
    const boundsPoints = [
      place.location,
      ...place.points.map((point) => point.location),
    ];
    const bounds = new window.google.maps.LatLngBounds();
    boundsPoints.forEach((point) => bounds.extend(point));
    console.log(get());
    get().fitBounds(bounds);
  }
  return (
    <>
      {types[place.type].getMarker({
        key: place.id,
        position: place.location,
      })}
      {place.points &&
        place.points.map((point, index) => (
          <Marker
            position={point.location}
            color={types[place.type].color}
            style={{ fontSize: "1.3em" }}
          >
            <span
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.4em",
                transform: "translateY(.3em)",
                display: "inline-block",
              }}
            ></span>
          </Marker>
        ))}
    </>
  );
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
          <Switch>
            <Route path={["/"]} exact>
              <Markers />
            </Route>

            <Route path={["/place/:id"]} exact>
              <PlaceMarker />
            </Route>
          </Switch>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default React.memo(Map, () => true);
