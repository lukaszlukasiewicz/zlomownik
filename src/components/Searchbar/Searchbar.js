import React, {useContext,useCallback} from 'react';
import {PlacesContext} from 'contexts/PlacesContext';
import Styles from './Searchbar.module.scss';
import {FaFilter as Filter, FaList as List, FaRegImage as Image, FaSearch as Search} from 'react-icons/fa'
import Button from 'components/UI/Button/Button';

const ListToggle = props => {
  
  const {listColapsed,setListColapsed} = useContext(PlacesContext);
  const handleClick = () => {
    setListColapsed(!listColapsed);
  }
  return (
    
    <Button onClick={handleClick}>
      {listColapsed ? <Image style={{fontSize:"1.2em",margin:"0 -.08em"}}/> : <List />}
    </Button>
  )
}

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
      <Button>
        <Filter  style={{fontSize:"0.8em"}}/>
      </Button>
      <ListToggle/>
    </div>
  )
}

export default SearchBar;