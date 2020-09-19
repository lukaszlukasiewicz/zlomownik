import React, {useContext,useCallback} from 'react';
import {PlacesContext} from 'contexts/PlacesContext';

const SearchBar = () => {
  const places = useContext(PlacesContext);
  const {filter,searchString} = places;
  const inputChange = useCallback((e) => {
    filter({searchString:e.target.value});
  },[filter])

  return (
    <input type="text" onChange={inputChange} value={searchString}/>
  )
}

export default SearchBar;