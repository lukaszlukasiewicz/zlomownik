import React, {useContext,useCallback} from 'react';
import {PlacesContext} from 'contexts/PlacesContext';

import Styles from './PlaceList.module.scss';

import Card from 'components/UI/Card/Card';


const  PlaceList = () => {

  const places = useContext(PlacesContext);
  const {filter,list} = places;
  const inputChange = useCallback((e) => {
    filter({searchString:e.target.value});
  },[filter])

  return (
    <div className={Styles.PlaceList}>
      <input type="text" onChange={inputChange} />
        {list.filter(place=>place.visible).map(place => <Card image={place.image} key={place.id} title={place.name}><small>{place.address}</small></Card> )}
    </div>
  )
}

export default PlaceList;