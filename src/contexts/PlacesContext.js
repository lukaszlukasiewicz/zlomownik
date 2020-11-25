import React, { useState, useEffect, useContext } from "react";
import { types } from "config/placeTypes";
import escapeRegex from "utils/escapeRegex";
import { MapContext } from "contexts/MapContext";
import useLocalStorage from "hooks/useLocalStorage";

export const PlacesContext = React.createContext();

function matchSearchString(place, searchString) {
  if (!searchString) return true;
  const regexp = new RegExp(searchString, "i");
  const { name, address } = place;
  if (name.match(regexp)) return true;
  if (address.match(regexp)) return true;
  return false;
}

const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [mapPosition, setMapPosition] = useState({
    center: { lat: 51, lng: 13 },
    zoom: 5,
  });

  const [listType, setListType] = useLocalStorage("listType");
  const [mapFilter, setMapFilter] = useLocalStorage("mapFilter");

  const [typeFilter, setTypeFilter] = useLocalStorage(
    "typEFilter",
    JSON.stringify(Object.keys(types))
  );

  const loadPlace = (placeID) => {
    let index = false;
    const place = places.find((place, currentindex) => {
      if (place.id === placeID) {
        index = currentindex;
        return true;
      }
    });

    if (place && !place.loaded) {
      const placeEndpoint = `${process.env.REACT_APP_API_URL}/places/${placeID}`;
      fetch(placeEndpoint)
        .then((data) => data.json())
        .then((placeData) => {
          const updatedPlaceData = Object.assign({}, place, placeData, {
            loaded: true,
          });
          const updatedList = [...places];
          updatedList[index] = updatedPlaceData;
          setPlaces(updatedList);
        });
    }
    return place;
  };

  const toggleTypeFilter = (type = "") => {
    const newTypeFilter = JSON.parse(typeFilter);
    console.log(newTypeFilter);
    if (typeFilter.includes(type))
      newTypeFilter.splice(newTypeFilter.indexOf(type), 1);
    else newTypeFilter.push(type);
    setTypeFilter(JSON.stringify(newTypeFilter));
  };

  const toggleListType = () => {
    setListType(1 === +listType ? 0 : 1);
  };

  const toggleMapFilter = () => {
    setMapFilter(1 === +mapFilter ? 0 : 1);
  };

  const map = useContext(MapContext);

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

  const saveMapPosition = () => {
    const mapInstance = map.get();
    const center = mapInstance.getCenter().toJSON();
    const zoom = mapInstance.getZoom();
    setMapPosition({ center, zoom });
  };

  return (
    <PlacesContext.Provider
      value={{
        list: places,
        filter: filterPlaces,
        searchString: filter.searchString,
        mapPosition,
        saveMapPosition,
        toggleListType,
        loadPlace,
        listType: parseInt(listType),
        toggleMapFilter,
        mapFilter: parseInt(mapFilter),
        typeFilter: JSON.parse(typeFilter),
        toggleTypeFilter,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

export default PlacesProvider;
