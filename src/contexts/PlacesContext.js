import React, { useState, useEffect } from "react";
import { types } from "config/placeTypes";
import escapeRegex from "utils/escapeRegex";

export const PlacesContext = React.createContext();

function matchSearchString(place, searchString) {
  if (!searchString) return true;
  const regexp = new RegExp(searchString, "i");
  const { name, address } = place;
  if (name.match(regexp)) return true;
  if (address.match(regexp)) return true;
  if (address.match(regexp)) return true;
  return false;
}

const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [listColapsed, setListColapsed] = useState(false);
  const [filter, setFilter] = useState({
    types: Object.keys(types),
    searchString: "",
  });
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/places`)
      .then((response) => response.json())
      .then((places) => {
        setPlaces(
          places.map((place) => {
            place.visible = true;
            place.onMap = true;
            return place;
          })
        );
      });
  }, []);

  const filterPlaces = (newFilter = {}) => {
    const updatedFilter = Object.assign({}, filter, newFilter);
    if (JSON.stringify(filter) === JSON.stringify(updatedFilter)) return false;
    const cleansearchString = escapeRegex(updatedFilter.searchString || "");
    console.log("filter", places);
    const filtered = places.map((place) => {
      const matchesString = matchSearchString(place, cleansearchString);
      const matchesType = updatedFilter.types
        ? updatedFilter.types.includes(place.type)
        : true;
      const visible = matchesString && matchesType;
      return Object.assign({}, place, { visible });
    });
    setPlaces(filtered);
    setFilter(updatedFilter);
  };

  return (
    <PlacesContext.Provider
      value={{
        list: places,
        filter: filterPlaces,
        searchString: filter.searchString,
        listColapsed,
        setListColapsed,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

export default PlacesProvider;
