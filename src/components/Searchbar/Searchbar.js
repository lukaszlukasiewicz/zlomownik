import React, { useContext, useCallback } from "react";
import { PlacesContext } from "contexts/PlacesContext";
import Styles from "./Searchbar.module.scss";
import {
  FaSlidersH as Filter,
  FaRegListAlt as List,
  FaRegImage as Image,
  FaSearch as Search,
} from "react-icons/fa";
import Button from "components/UI/Button/Button";

const ListToggle = (props) => {
  const { listType, toggleListType } = useContext(PlacesContext);
  const handleClick = () => {
    toggleListType();
  };
  return (
    <Button onClick={handleClick} flat={true}>
      {listType ? (
        <List style={{ fontSize: "1.2em" }} />
      ) : (
        <Image style={{ fontSize: "1.2em" }} />
      )}
    </Button>
  );
};

const MapFilterToggle = (props) => {
  const { toggleMapFilter } = useContext(PlacesContext);
  const handleClick = () => {
    toggleMapFilter();
  };
  return (
    <Button onClick={handleClick} flat={true}>
      <Filter style={{ fontSize: "1.2em" }} />
    </Button>
  );
};

const SearchBar = () => {
  const places = useContext(PlacesContext);
  const { filter, searchString } = places;
  const inputChange = useCallback(
    (e) => {
      filter({ searchString: e.target.value });
    },
    [filter]
  );

  return (
    <div className={`${Styles.Searchbar}`}>
      <div className={Styles.SearchInput}>
        <Search className="icon" color="#666" />
        <input
          type="text"
          placeholder="Wyszukaj miejsce..."
          onChange={inputChange}
          value={searchString}
        />
      </div>
      <MapFilterToggle />
      <ListToggle />
    </div>
  );
};

export default SearchBar;
