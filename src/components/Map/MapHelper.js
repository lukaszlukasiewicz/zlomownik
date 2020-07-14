import {useContext,useRef} from 'react';
import {PlacesContext} from 'contexts/PlacesContext';
import {MapContext} from 'contexts/MapContext';

let centered = false;

const MapHelper = (props) => {
  const places = useContext(PlacesContext);
  const map = useContext(MapContext);
  const listeners = useRef(false)

  if(!props.map) return false;

  //Save map instance to context
  if(map && !map.instance()) setTimeout(()=>{
    map.instance(props.map);
  },0);

  //Save map center and zoom to context
  if(!listeners.current) {
    props.map.addListener('idle', ()=>{
      map.center(props.map.getCenter().toJSON());
      map.zoom(props.map.getZoom());
    });
    setTimeout(()=>{
      props.map.setCenter(map.center())
      props.map.setZoom(map.zoom());
    },0);
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

export default MapHelper;