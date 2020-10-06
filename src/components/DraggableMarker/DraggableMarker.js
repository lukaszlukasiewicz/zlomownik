import React,{useContext} from 'react'
import Marker from 'components/Marker/Marker'
import {MapContext} from 'contexts/MapContext';



const DraggableMarker = (props={}) => {
  
  const Map = useContext(MapContext);
  const mapInstance = Map.instance();
  const handleMouseDown = e => {
    
    const markerContainer = e.currentTarget.parentElement;
    mapInstance.setOptions({draggable:false});
    const clientRect = markerContainer.getBoundingClientRect();
    const top = parseFloat(markerContainer.style.top.replace('px',''));
    const left = parseFloat(markerContainer.style.left.replace('px',''));
    let offsetX = (left + (clientRect.left - e.clientX)) - clientRect.left;
    let offsetY = (top + (clientRect.top - e.clientY)) - clientRect.top;
    const mouseMove = e => {
      markerContainer.style.top = `${e.clientY + offsetY }px`;
      markerContainer.style.left = `${e.clientX + offsetX }px`;
    }
    document.addEventListener('mousemove', mouseMove);
    const mouseUp = e => {
      const projection = mapInstance.getProjection();
      const bounds = mapInstance.getBounds().toJSON();
      const northWest = {lat:bounds.north,lng:bounds.west};
      const projectionNW = projection.fromLatLngToPoint(new window.google.maps.LatLng(northWest))
      const scale = Math.pow(2,mapInstance.getZoom());
      const point = new window.google.maps.Point(
        e.pixel.x / scale + projectionNW.x,
        e.pixel.y / scale + projectionNW.y,
      )
      
      if(typeof props.onDragEnd === 'function') props.onDragEnd(projection.fromPointToLatLng(point).toJSON());
      window.google.maps.event.removeListener(listener);
      document.removeEventListener('mousemove',mouseMove);
      mapInstance.setOptions({draggable:true});
    }
    const listener = mapInstance.addListener('mouseup',mouseUp)
  }


  return (
    <Marker 
      {...props}
      position={props.position}
      onMouseDown={handleMouseDown}
    >
      {props.children}
    </Marker>
  )

}

export default DraggableMarker;