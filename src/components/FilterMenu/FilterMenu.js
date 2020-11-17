import React, { useContext } from "react";
import { PlacesContext } from "contexts/PlacesContext";
import Button from "components/UI/Button/Button";
import Toggle from "components/UI/Toggle/Toggle";
import PopMenu from "components/UI/PopMenu/PopMenu";

import { FaSlidersH as Filter } from "react-icons/fa";

export default (props) => {
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
