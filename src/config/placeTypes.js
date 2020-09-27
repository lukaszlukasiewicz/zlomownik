import React from "react";
import {
  FaTree as Wild,
  FaCampground as Camping,
  FaLandmark as Attraction,
  FaRoute as Route,
  FaMortarPestle as Food,
  FaParking as Parking,
  FaShower as Shower,
  FaWalking as Walk,
  FaCarAlt as Car,
  FaMapMarker as Marker,
} from "react-icons/fa";

import styles from './marker.module.scss';


function getMarker(props = {}) {
  console.log(styles.Marker);
  this.marker =this.maker || (
    <div className={styles.Marker} style={{fontSize:'1.4em'}}>
      <Marker className={styles.Marker__shadow}></Marker>     
      <Marker className={styles.Marker__icon} color={this.color} onClick={props.onClick}></Marker>      
      <div  className={styles.Icon}>{this.icon}</div>
    </div>
  )
  return this.marker;
}

export const types = {
  camping: {
    text: "Camping",
    textMultiple: "Campingi",
    icon: <Camping style={{ fill: "inherit",transform:'translateY(-.1em)'}} />,
    color: "#7f8fa6",
    getMarker,
  },
  wild: {
    text: "Dziki nocleg",
    textMultiple: "Dzikie noclegi",
    icon: <Wild style={{ fill: "inherit" }} />,
    color: "#2ecc71",
    getMarker,
  },
  route: {
    text: "Trasa widokowa",
    textMultiple: "Trasy widokowe",
    icon: <Route style={{ fill: "inherit" }} />,
    color: "#9b59b6",
    getMarker,
  },
  walk: {
    text: "Trasa piesza",
    textMultiple: "Trasy piesze",
    icon: <Walk style={{ fill: "inherit" }} />,
    color: "#ff6b6b",
    getMarker,
  },
  parking: {
    text: "Parking",
    textMultiple: "Parkingi",
    icon: <Parking style={{ fill: "inherit" }} />,
    color: "#0984e3",
    getMarker,
  },
  attraction: {
    text: "Atrakcja turystyczna",
    textMultiple: "Atrakcje turystyczne",
    icon: <Attraction style={{ fill: "inherit" }} />,
    color: "#f1c40f",
    getMarker,
  },
  food: {
    text: "Jedzenie i picie",
    textMultiple: "Jedenie i picie",
    icon: <Food style={{ fill: "inherit" }} />,
    color: "#e55039",
    getMarker,
  },
  shower: {
    text: "Prysznic",
    textMultiple: "Prysznice",
    icon: <Shower style={{ fill: "inherit" }} />,
    color: "#0abde3",
    getMarker,
  },
  car: {
    text: "Atrakcja motoryzacyjna",
    textMultiple: "Atrakcja motoryzacyjne",
    icon: <Car style={{ fill: "inherit" }} />,
    color: "#38ada9",
    getMarker,
  }
};
