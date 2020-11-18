import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { PlacesContext } from "contexts/PlacesContext";

export default (props) => {
  const { list } = useContext(PlacesContext);
  const { id } = useParams();
  const place = list.find((place) => place.id === id);
  const history = useHistory();
  console.log(place);
  if (!place) return false;
  return (
    <div>
      <div>
        <button onClick={(e) => history.goBack()}>Wróć</button>
      </div>
      <img src={place.image} alt={place.name} />
      <h1>{place.name}</h1>
    </div>
  );
};
