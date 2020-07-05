import React, {useContext} from 'react';
import {mapComponent} from "./Map.module.scss"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {PlacesContext} from 'contexts/PlacesContext';
import {MapContext} from 'contexts/MapContext';


const libraries = ['geometry']

const center = {
  lat: 59.95,
  lng: 30.33
}

let centered = false;


const Map = (props) => {

  const zoomPosition = (window.google && window.google.maps.ControlPosition.LEFT_BOTTOM) || null;
  const typeControl = (window.google && window.google.maps.MapTypeControlStyle.DROPDOWN_MENU) || null
  const places = useContext(PlacesContext);
  const map = useContext(MapContext);

  console.log('render');
  // Fit bounds after first load
  if(!centered && places.list.length && map.get) {
    const bounds = new window.google.maps.LatLngBounds();
    places.list.forEach(place => {
      bounds.extend(place.location);
    })
    map.get.fitBounds(bounds);
    centered = true;
  }
  return(
    <div className={mapComponent}>
      <LoadScript
        libraries={libraries}
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
      >
      <GoogleMap
          mapContainerStyle={{height:'100%'}}
          center={center}
          zoom={10}
          onLoad={mapEl => map.set(mapEl)}
          options={{streetViewControlOptions:{position:zoomPosition},zoomControlOptions:{position:zoomPosition},mapTypeControlOptions:{style:typeControl} }}
          id="marker-example"
        >
          {places.list.filter(place=>place.visible && place.location.lat).map(place => <Marker position={place.location} key={place.id}/>)}
        </GoogleMap>
      </LoadScript>
   
    </div>
  ) 

}

export default Map;