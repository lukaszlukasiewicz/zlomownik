import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { PlacesContext } from "contexts/PlacesContext";
import Styles from "./PlaceInfo.module.scss";

export default (props) => {
  const { list } = useContext(PlacesContext);
  const { id } = useParams();
  const place = list.find((place) => place.id === id);
  const history = useHistory();
  console.log(place);
  if (!place) return false;
  console.log(place.location);
  return (
    <div className={Styles.PlaceInfo}>
      <div>
        <button onClick={(e) => history.goBack()}>Wróć</button>
      </div>
      <div className={Styles.PlaceInfo__gallery}>
        <div
          className={Styles.PlaceInfo__image}
          style={{ backgroundImage: `url(${place.image})` }}
        ></div>
      </div>
      <h1 className={Styles.PlaceInfo__name}>{place.name}</h1>
      <p className={Styles.PlaceInfo__address}>{place.address}</p>
      <p
        className={Styles.PlaceInfo__location}
      >{`GPS: ${place.location.lat} ${place.location.lng}`}</p>
    </div>
  );
};
