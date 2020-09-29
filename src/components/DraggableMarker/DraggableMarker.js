import React from 'react'
import Marker from 'components/Marker/Marker'
const DraggableMarker = (props={}) => {

  const handleMouseEnter = e => {
    if(!e.currentTarget.added) {
      e.currentTarget.parentElement.addEventListener('mousedown', e => {
        e.stopPropagation();
      })
      e.currentTarget.parentElement.style.pointerEvents = "none";
    } 
    e.currentTarget.added = true;
  }

  return (
    <Marker {...props} onMouseEnter={handleMouseEnter}>
      {props.children}
    </Marker>
  )

}

export default DraggableMarker;