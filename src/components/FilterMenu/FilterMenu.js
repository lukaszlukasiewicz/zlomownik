import React, { useContext } from "react";
import { PlacesContext } from "contexts/PlacesContext";
import Button from "components/UI/Button/Button";
import Toggle from "components/UI/Toggle/Toggle";
import PopMenu from "components/UI/PopMenu/PopMenu";
import { types } from "config/placeTypes/";
import Styles from "./FilterMenu.module.scss";

import { FaSlidersH as Filter } from "react-icons/fa";

const TypesOptions = (props) => {
  const typeBtns = [];
  for (const type in types) {
    typeBtns.push(
      <Button flat={true}>
        <span style={{ fill: types[type].color }}>{types[type].icon}</span>
      </Button>
    );
  }
  return <div className={Styles.FilterMenu}>{typeBtns}</div>;
};

export default (props) => {
  const { mapFilter, toggleMapFilter } = useContext(PlacesContext);
  const button = (
    <Button flat={true}>
      <Filter style={{ fontSize: "1.2em" }} />
    </Button>
  );
  return (
    <PopMenu component={button}>
      <TypesOptions />
      <div className={Styles.FilterOptions}>
        <Toggle
          state={mapFilter}
          onChange={toggleMapFilter}
          label="Filtruj po mapie"
        />
      </div>
    </PopMenu>
  );
};
