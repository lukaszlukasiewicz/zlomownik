import React, {useState,useContext, useRef} from 'react';
import styles from "./Map.module.scss"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {PlacesContext} from 'contexts/PlacesContext';
import {MapContext} from 'contexts/MapContext';


const libraries = ['geometry']
let centered = false;

const Markers = () => {
  const places = useContext(PlacesContext);
  return places.list.filter(place=>place.visible && place.location.lat).map(place => <Marker position={place.location} key={place.id}/>)
}

const Places = (props) => {
  const places = useContext(PlacesContext);
  const map = useContext(MapContext);
  const listeners = useRef(false)

  if(!props.map) return false;

  //Save map instance to context
  if(!map.instance()) setTimeout(()=>{
    map.instance(props.map);
  },0);

  //Save map center and zoom to context
  if(!listeners.current) {
    props.map.addListener('idle', ()=>{
      map.center(props.map.getCenter().toJSON());
      map.zoom(props.map.getZoom());
    });
    listeners.current = true;
  }

  // Fit bounds on first render;
  if(!centered && places.list.length) {
    const bounds = new window.google.maps.LatLngBounds();
    places.list.forEach(place => bounds.extend(place.location))
    props.map.fitBounds(bounds);
    centered = true;
  }
  return false;
}


const Map = (props) => {

  const zoomPosition = (window.google && window.google.maps.ControlPosition.LEFT_BOTTOM) || null;
  const typeControl = (window.google && window.google.maps.MapTypeControlStyle.DROPDOWN_MENU) || null
  const [map,setMap] = useState();

  return(
    <div className={styles.Map}>
      {props.children}
      <Places map={map}/>
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