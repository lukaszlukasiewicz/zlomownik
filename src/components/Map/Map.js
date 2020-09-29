import React, {useState,useContext} from 'react';
import styles from "./Map.module.scss"
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {PlacesContext} from 'contexts/PlacesContext';
import MapHelper from './MapHelper';
import {types} from 'config/placeTypes';

const libraries = ['geometry']

const Markers = () => {
  const places = useContext(PlacesContext);
  return places.list.filter(place=>place.visible && place.location.lat).map(place => { return types[place.type].getMarker({key:place.id,position:place.location,onClick:handleMarkerClick})})
}

function handleMarkerClick() {
  console.log("Marker clicked");
}

const Map = (props) => {

  const zoomPosition = (window.google && window.google.maps.ControlPosition.LEFT_BOTTOM) || null;
  const typePosition = (window.google && window.google.maps.ControlPosition.TOP_CENTER ) || null
  const [map,setMap] = useState();

  return(
    <div className={`${styles.Map} ${props.className}`}>
      {props.children}
      <MapHelper map={map}/>
      <LoadScript
        libraries={libraries}
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
      >
      <GoogleMap
          mapContainerStyle={{height:'100%'}}
          center={{ lat:51, lng:13 }}
          zoom={10}
          onLoad={(map)=>setMap(map)}
          options={{streetViewControl:false,zoomControlOptions:{position:zoomPosition},mapTypeControlOptions:{position:typePosition} }}
          
        >
          <Markers/>
        </GoogleMap>
      </LoadScript>
    </div>
  ) 

}

export default React.memo(Map);