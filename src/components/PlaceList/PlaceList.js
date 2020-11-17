import React, { useState, useEffect, useContext } from "react";
import { PlacesContext } from "contexts/PlacesContext";
import { MapContext } from "contexts/MapContext";
import Styles from "./PlaceList.module.scss";
import Card, { CardImage } from "components/UI/Card/Card";
import { types } from "config/placeTypes";
import { Link } from "react-router-dom";

let fitBoundsOnStart = true;

function isInBounds(location, bounds) {
  if (!bounds) return true;
  const { lat, lng } = location;
  return (
    lat >= bounds.south &&
    lat <= bounds.north &&
    lng >= bounds.west &&
    lng <= bounds.east
  );
}

const ExpandedCard = (props = {}) => {
  return (
    <Card
      key={props.place.id}
      title={props.place.name}
      className={Styles.Card__expanded}
    >
      <Link to={`/place/${props.place.id}`}>
        <CardImage title={props.place.name} image={props.place.image} />
        <div className={Styles.PlaceCard__title}>
          <div
            className={Styles.PlaceCard__icon}
            style={{ fill: types[props.place.type].color }}
          >
            {types[props.place.type].icon}
          </div>
          <div className={Styles.PlaceCard_address}>{props.place.address}</div>
        </div>
      </Link>
    </Card>
  );
};

const ColapsedCard = (props = {}) => {
  return (
    <Card key={props.place.id} className={Styles.Card__colapsed}>
      <Link to={`/place/${props.place.id}`} className={Styles.PlaceCard__title}>
        <div
          className={Styles.PlaceCard__icon}
          style={{ fill: types[props.place.type].color }}
        >
          {types[props.place.type].icon}
        </div>
        <div className={Styles.PlaceCard_address}>
          <h2 style={{ margin: 0, fontSize: "1.1em" }}>{props.place.name}</h2>
          {props.place.address}
        </div>
      </Link>
    </Card>
  );
};

const PlaceList = () => {
  const places = useContext(PlacesContext);
  const map = useContext(MapContext);
  const [bounds, setBounds] = useState();

  useEffect(() => {
    if (map.get()) {
      const listener = map.get().addListener("idle", () => {
        const bounds = map.get().getBounds();
        if (bounds) setBounds(bounds.toJSON());
        places.saveMapPosition();
      });
      return () => {
        window.google.maps.event.removeListener(listener);
      };
    }
  }, [map, places]);

  useEffect(() => {
    const { center, zoom } = places.mapPosition;
    if (JSON.stringify(center) !== JSON.stringify(map.center()))
      map.center(center);
    if (zoom !== map.zoom()) map.zoom(zoom);
  }, [map, places.mapPosition]);

  useEffect(() => {
    if (map.get() && places.list.length && fitBoundsOnStart) {
      const bounds = new window.google.maps.LatLngBounds();
      places.list.forEach((place) => {
        bounds.extend(place.location);
      });
      map.get().fitBounds(bounds);
      fitBoundsOnStart = false;
    }
  }, [map, places.list]);

  const { list, listType } = places;
  const { mapFilter, typeFilter } = useContext(PlacesContext);
  return (
    <div className={`${Styles.PlaceList} ${!listType ? Styles.collapsed : ""}`}>
      {list
        .filter((place) => {
          const inBounds = isInBounds(place.location, bounds);
          const typeIncluded = typeFilter.includes(place.type);
          return place.visible && typeIncluded && (!mapFilter || inBounds);
        })
        .map((place) =>
          listType ? (
            <ExpandedCard place={place} key={place.id} />
          ) : (
            <ColapsedCard place={place} key={place.id} />
          )
        )}
    </div>
  );
};

export default PlaceList;
