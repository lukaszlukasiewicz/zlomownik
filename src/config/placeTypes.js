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
} from "react-icons/fa";
import Marker from 'components/Marker/Marker'



function getMarker(props = {}) {
  if(!props.style) props.style={};
  props.style.transform = "scale(1.6)";
  const iconStyle = {};
  if(this.text === 'Camping') iconStyle.transform = "translateY(-.1em)"; 
  this.marker =this.maker || (
    <Marker {...props} color={this.color}>
      <div style={{fill:'#ffffff'}}>
        <div style={iconStyle}>{this.icon}</div>
      </div>
    </Marker>
  )
  return this.marker;
}

export const types = {
  camping: {
    text: "Camping",
    textMultiple: "Campingi",
    icon: <Camping style={{ fill: "inherit"}} />,
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
