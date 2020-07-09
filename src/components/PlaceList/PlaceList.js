import React, {useContext,useCallback} from 'react';
import {PlacesContext} from 'contexts/PlacesContext';

import Card from 'components/UI/Card/Card';


const  PlaceList = () => {

  const places = useContext(PlacesContext);
  const {filter,list} = places;
  const inputChange = useCallback((e) => {
    filter({searchString:e.target.value});
  },[filter])

  return (
    <div>
      <input type="text" onChange={inputChange} />
        {list.filter(place=>place.visible).map(place => <Card key={place.id}>{place.name}<br/><small>{place.address}</small></Card> )}
    </div>
  )
}

export default PlaceList;