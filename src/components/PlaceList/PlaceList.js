import React, {useContext} from 'react';
import {PlacesContext} from 'contexts/PlacesContext';

import Styles from './PlaceList.module.scss';

import Card from 'components/UI/Card/Card';
import {types} from 'config/placeTypes'


const  PlaceList = () => {

  const places = useContext(PlacesContext);
  const {list} = places;
  return (
    <div className={Styles.PlaceList}>
        {list.filter(place=>place.visible).map(place => 
          <Card image={place.image} key={place.id} title={place.name}>
            <div className={Styles.PlaceCard__title}>
              <div className={Styles.PlaceCard__icon}style={{fill:types[place.type].color}}>{types[place.type].icon}</div>
              <div className={Styles.PlaceCard_address}>{place.address}</div>
            </div>
          </Card>)}
    </div>
  )
}

export default PlaceList;