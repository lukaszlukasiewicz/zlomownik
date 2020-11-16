import React, { useContext, useCallback } from "react";
import { PlacesContext } from "contexts/PlacesContext";
import Styles from "./Searchbar.module.scss";
import PopMenu from "components/UI/PopMenu/PopMenu";
import Toggle from "components/UI/Toggle/Toggle";
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

const MapFilterMenu = (props) => {
  const { mapFilter, toggleMapFilter } = useContext(PlacesContext);
  const button = (
    <Button flat={true}>
      <Filter style={{ fontSize: "1.2em" }} />
    </Button>
  );
  return (
    <PopMenu component={button}>
      <Toggle
        state={mapFilter}
        onChange={toggleMapFilter}
        label="Filtruj po mapie"
      />
    </PopMenu>
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
      <MapFilterMenu />
      <ListToggle />
    </div>
  );
};

export default SearchBar;
