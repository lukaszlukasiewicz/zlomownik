import React from 'react'
import { OverlayView } from '@react-google-maps/api';
import Styles from './Marker.module.scss';
import {
  FaMapMarker as MarkerIcon,
} from "react-icons/fa";



const Marker = (props = {} ) => {

  return (
      <OverlayView position={props.position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} >
        <div className={Styles.Marker} {...props} >
          <MarkerIcon className={Styles.Marker__shadow} />
          <MarkerIcon className={Styles.Marker__marker} color={props.color} />
          <div className={Styles.Marker__icon}>
            {props.children}
          </div>
        </div>
      </OverlayView>
  )
} 

export default Marker;