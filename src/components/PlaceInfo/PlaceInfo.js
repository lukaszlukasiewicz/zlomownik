import React from "react";
import { useParams, useHistory } from "react-router-dom";
import Styles from "./PlaceInfo.module.scss";
import usePlace from "hooks/usePlace";

export default (props) => {
  const { id } = useParams();
  const place = usePlace(id);
  const history = useHistory();
  if (!place) return false;
  console.log(place.description, place);
  return (
    <div className={Styles.PlaceInfo}>
      <div>
        <button onClick={(e) => history.push("/")}>Wróć do listy</button>
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
      {place.description && <div>{place.description}</div>}
    </div>
  );
};
