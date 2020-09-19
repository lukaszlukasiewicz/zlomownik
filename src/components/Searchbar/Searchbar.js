import React, {useContext,useCallback} from 'react';
import {PlacesContext} from 'contexts/PlacesContext';
import Styles from './Searchbar.module.scss';

const SearchBar = () => {
  const places = useContext(PlacesContext);
  const {filter,searchString} = places;
  const inputChange = useCallback((e) => {
    filter({searchString:e.target.value});
  },[filter])

  return (
    <div className={`${Styles.Searchbar}`}>
      <input type="text" onChange={inputChange} value={searchString}/>
    </div>
  )
}

export default SearchBar;