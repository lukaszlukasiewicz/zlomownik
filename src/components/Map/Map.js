import React, {useState,useContext} from 'react';
import styles from "./Map.module.scss"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {PlacesContext} from 'contexts/PlacesContext';

import MapHelper from './MapHelper';


const libraries = ['geometry']

const Markers = () => {
  const places = useContext(PlacesContext);
  return places.list.filter(place=>place.visible && place.location.lat).map(place => <Marker position={place.location} key={place.id}/>)
}



const Map = (props) => {

  const zoomPosition = (window.google && window.google.maps.ControlPosition.LEFT_BOTTOM) || null;
  const typeControl = (window.google && window.google.maps.MapTypeControlStyle.DROPDOWN_MENU) || null
  const [map,setMap] = useState();

  return(
    <div className={styles.Map}>
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
          options={{streetViewControlOptions:{position:zoomPosition},zoomControlOptions:{position:zoomPosition},mapTypeControlOptions:{style:typeControl} }}
          
        >
          <Markers/>
        </GoogleMap>
      </LoadScript>
    </div>
  ) 

}

export default React.memo(Map);