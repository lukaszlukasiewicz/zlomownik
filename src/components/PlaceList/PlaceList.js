import React, {useContext,useCallback} from 'react';
import {PlacesContext} from 'contexts/PlacesContext';


const  PlaceList = () => {

  const places = useContext(PlacesContext);
  const {filter,list} = places;
  const inputChange = useCallback((e) => {
    filter({searchString:e.target.value});
  },[filter])

  return (
    <div>
      <input type="text" onChange={inputChange} />
      <ul>
        {list.filter(place=>place.visible).map(place => <li key={place.id}>{place.name}<br/><small>{place.address}</small></li> )}
      </ul>
    </div>
  )
}

export default PlaceList;