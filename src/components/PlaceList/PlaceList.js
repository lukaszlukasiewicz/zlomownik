import React, {useContext} from 'react';
import {PlacesContext} from 'contexts/PlacesContext';

import Styles from './PlaceList.module.scss';

import Card from 'components/UI/Card/Card';
import {types} from 'config/placeTypes'


const ExpandedCard = ( props = {} ) => {
  return (
    <Card image={props.place.image} key={props.place.id} title={props.place.name}>
      <div className={Styles.PlaceCard__title}>
        <div className={Styles.PlaceCard__icon}style={{fill:types[props.place.type].color}}>{types[props.place.type].icon}</div>
        <div className={Styles.PlaceCard_address}>{props.place.address}</div>
      </div>
    </Card>
  )
}


const ColapsedCard = ( props = {} ) => {
  return (
    <Card key={props.place.id}>
      <div className={Styles.PlaceCard__title}>
        <div className={Styles.PlaceCard__icon}style={{fill:types[props.place.type].color}}>{types[props.place.type].icon}</div>
        <div className={Styles.PlaceCard_address}><h2 style={{margin:0,fontSize:'1.1em',}}>{props.place.name}</h2>{props.place.address}</div>
      </div>
    </Card>
  )
}

const  PlaceList = () => {

  const places = useContext(PlacesContext);
  const {list,listColapsed} = places;
  return (
    <div className={`${Styles.PlaceList} ${listColapsed ? Styles.collapsed : ''}`}>
        {list.filter(place=>place.visible).map(place => listColapsed ? <ColapsedCard place={place} /> :  <ExpandedCard place={place} />)}
    </div>
  )
}

export default PlaceList;