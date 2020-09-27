import React, {useContext,useCallback} from 'react';
import {PlacesContext} from 'contexts/PlacesContext';
import Styles from './Searchbar.module.scss';
import {FaSearch as Search} from 'react-icons/fa'

const SearchBar = () => {
  const places = useContext(PlacesContext);
  const {filter,searchString} = places;
  const inputChange = useCallback((e) => {
    filter({searchString:e.target.value});
  },[filter])

  return (
    <div className={`${Styles.Searchbar}`}>
      <div  className={Styles.SearchInput}>
        <Search className="icon" color="#aaa"/>
        <input type="text" placeholder="Wyszukaj miejsce..." onChange={inputChange} value={searchString}/>
      </div>
        
    </div>
  )
}

export default SearchBar;