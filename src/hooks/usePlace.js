import { useState, useContext } from "react";
import { PlacesContext } from "contexts/PlacesContext";

export default (placeId) => {
  const { loadPlace } = useContext(PlacesContext);
  const place = loadPlace(placeId);
  return place;
};
