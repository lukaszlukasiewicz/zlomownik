import React, { useState, useEffect, useContext } from "react";
import { PlacesContext } from "contexts/PlacesContext";
import { MapContext } from "contexts/MapContext";
import Styles from "./PlaceList.module.scss";
import Card from "components/UI/Card/Card";
import { types } from "config/placeTypes";

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
      image={props.place.image}
      key={props.place.id}
      title={props.place.name}
    >
      <div className={Styles.PlaceCard__title}>
        <div
          className={Styles.PlaceCard__icon}
          style={{ fill: types[props.place.type].color }}
        >
          {types[props.place.type].icon}
        </div>
        <div className={Styles.PlaceCard_address}>{props.place.address}</div>
      </div>
    </Card>
  );
};

const ColapsedCard = (props = {}) => {
  return (
    <Card key={props.place.id}>
      <div className={Styles.PlaceCard__title}>
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
      </div>
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
        setBounds(map.get().getBounds().toJSON());
      });

      return () => {
        window.google.maps.event.removeListener(listener);
      };
    }
  }, [map]);

  const { list, listColapsed } = places; //TODO: Use local storage
  return (
    <div
      className={`${Styles.PlaceList} ${listColapsed ? Styles.collapsed : ""}`}
    >
      {list
        .filter((place) => {
          const inBounds = isInBounds(place.location, bounds);
          return place.visible && inBounds;
        })
        .map((place) =>
          listColapsed ? (
            <ColapsedCard place={place} key={place.id} />
          ) : (
            <ExpandedCard place={place} key={place.id} />
          )
        )}
    </div>
  );
};

export default PlaceList;
