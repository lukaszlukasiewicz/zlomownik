import React, {useContext} from 'react';
import {PlacesContext} from 'contexts/PlacesContext';

import Styles from './PlaceList.module.scss';

import Card from 'components/UI/Card/Card';


const  PlaceList = () => {

  const places = useContext(PlacesContext);
  const {list} = places;

  return (
    <div className={Styles.PlaceList}>
        {list.filter(place=>place.visible).map(place => 
          <Card image={place.image} key={place.id} title={place.name}>
            <small>{place.address}</small>
          </Card>)}
    </div>
  )
}

export default PlaceList;